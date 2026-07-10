import { useEffect, useRef, useState } from 'react'
import { Section, Fade, FormLabel, Input, BrandText, Button } from '../ui'
import { supabase } from '../../lib/supabase'
import { cn } from '../../design/cn'

// Client ID is a public value, so exposing it on the frontend is safe.
// The Secret lives only on the server (Edge Functions).
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
// Currencies the customer can pay in. Must match the server's PAYPAL_CURRENCIES allow-list.
const CURRENCIES = {
  USD: { symbol: '$', label: 'USD' },
  EUR: { symbol: '€', label: 'EUR' },
}
const CURRENCY_CODES = Object.keys(CURRENCIES)
const DEFAULT_CURRENCY = 'USD'
const MIN_AMOUNT = 1
const MAX_AMOUNT = 50000 // Keep in sync with the server's PAYPAL_MAX_AMOUNT.

const symbolFor = (code) => CURRENCIES[code]?.symbol ?? ''

// Load the PayPal JS SDK, once per currency. The SDK's currency is fixed at load
// time (it's a URL param), so to support multiple currencies we load one script per
// currency under its own window namespace (data-namespace) and render buttons from
// the matching namespace. Cached by currency, so switching back is instant.
const sdkCache = {} // currency -> Promise<paypal namespace object>
function loadPayPalSdk(clientId, currency) {
  if (sdkCache[currency]) return sdkCache[currency]

  const namespace = `paypal_${currency.toLowerCase()}`
  const p = new Promise((resolve, reject) => {
    if (window[namespace]) return resolve(window[namespace])

    const params = new URLSearchParams({
      'client-id': clientId,
      currency,
      intent: 'capture',
      components: 'buttons',
    })

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`
    script.async = true
    script.setAttribute('data-namespace', namespace)
    script.onload = () => resolve(window[namespace])
    script.onerror = () => reject(new Error('PayPal SDK load failed'))
    document.body.appendChild(script)
  })
  // Don't cache a failure — allow a later retry (e.g. after a flaky network).
  p.catch(() => {
    delete sdkCache[currency]
  })
  sdkCache[currency] = p
  return p
}

function parseAmount(raw) {
  const n = Number(String(raw ?? '').replace(/,/g, '').trim())
  if (!Number.isFinite(n)) return null
  return Math.round(n * 100) / 100
}

export function Payment() {
  const [amount, setAmount] = useState('')
  const [payerName, setPayerName] = useState('')
  const [payerEmail, setPayerEmail] = useState('')
  const [reference, setReference] = useState('')
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY)
  const [status, setStatus] = useState('idle') // idle | processing | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(null)
  const [sdkState, setSdkState] = useState('loading') // loading | ready | error | unconfigured

  const containerRef = useRef(null)
  const buttonsRef = useRef(null) // { instance, actions } — imperative PayPal Buttons handle
  const liveRef = useRef({}) // mirror of latest form values/validity for imperative callbacks

  const parsed = parseAmount(amount)
  const amountValid = parsed !== null && parsed >= MIN_AMOUNT && parsed <= MAX_AMOUNT

  // PayPal callbacks (createOrder/onClick) capture a stale closure, so sync latest values into a ref.
  useEffect(() => {
    liveRef.current = { amount, payerName, payerEmail, reference, amountValid, currency }
  })

  // Load the SDK for the selected currency (re-runs when the customer switches currency).
  useEffect(() => {
    const configured = CLIENT_ID && typeof supabase.functions?.invoke === 'function'
    if (!configured) {
      setSdkState('unconfigured')
      return
    }
    let cancelled = false
    setSdkState('loading')
    loadPayPalSdk(CLIENT_ID, currency)
      .then(() => !cancelled && setSdkState('ready'))
      .catch(() => !cancelled && setSdkState('error'))
    return () => {
      cancelled = true
    }
  }, [currency])

  // Render the PayPal buttons for the selected currency. Re-runs when the currency
  // changes so the buttons come from that currency's SDK namespace; the previous
  // instance is torn down in cleanup first.
  useEffect(() => {
    if (sdkState !== 'ready' || !containerRef.current) return
    const paypalNs = window[`paypal_${currency.toLowerCase()}`]
    if (!paypalNs) return

    const handle = { instance: null, actions: null }
    buttonsRef.current = handle

    const buttons = paypalNs.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', tagline: false },

      onInit(_data, actions) {
        handle.actions = actions
        if (liveRef.current.amountValid) actions.enable()
        else actions.disable()
      },

      onClick(_data, actions) {
        const n = parseAmount(liveRef.current.amount)
        if (n === null || n < MIN_AMOUNT || n > MAX_AMOUNT) {
          const cur = liveRef.current.currency
          const sym = symbolFor(cur)
          setStatus('error')
          setErrorMsg(
            `Please enter an amount between ${sym}${MIN_AMOUNT.toLocaleString()} and ${sym}${MAX_AMOUNT.toLocaleString()} ${cur}.`,
          )
          return actions.reject()
        }
        setStatus('idle')
        setErrorMsg('')
        return actions.resolve()
      },

      async createOrder() {
        const n = parseAmount(liveRef.current.amount)
        const { data, error } = await supabase.functions.invoke('paypal-create-order', {
          body: {
            amount: n,
            currency: liveRef.current.currency,
            payer_name: liveRef.current.payerName || null,
            payer_email: liveRef.current.payerEmail || null,
            reference: liveRef.current.reference || null,
          },
        })
        if (error || !data?.id) {
          throw new Error(error?.message || 'create-order failed')
        }
        return data.id
      },

      async onApprove(data) {
        setStatus('processing')
        setErrorMsg('')
        const { data: res, error } = await supabase.functions.invoke('paypal-capture-order', {
          body: { orderID: data.orderID },
        })
        // 'completed' = 즉시 확정, 'pending' = PayPal 검토 대기(둘 다 접수 성공).
        if (error || (res?.status !== 'completed' && res?.status !== 'pending')) {
          setStatus('error')
          setErrorMsg(
            "We couldn't finalize your payment. If you were not charged, please try again — if the problem persists, contact us.",
          )
          return
        }
        setSuccess(res)
        setStatus('success')
      },

      onCancel() {
        setStatus('idle')
        setErrorMsg('')
      },

      onError(err) {
        console.error('[payment] paypal error:', err)
        setStatus('error')
        setErrorMsg('Something went wrong during payment. Please try again in a moment.')
      },
    })

    handle.instance = buttons
    const rendered = buttons.render(containerRef.current)
    if (rendered?.catch) rendered.catch(() => {}) // ignore render rejection during unmount

    return () => {
      try {
        buttons.close?.()
      } catch {
        /* noop */
      }
      buttonsRef.current = null
    }
  }, [sdkState, currency])

  // Toggle the buttons enabled/disabled as amount validity changes.
  useEffect(() => {
    const actions = buttonsRef.current?.actions
    if (!actions) return
    if (amountValid) actions.enable?.()
    else actions.disable?.()
  }, [amountValid])

  const resetForm = () => {
    setSuccess(null)
    setStatus('idle')
    setErrorMsg('')
    setAmount('')
    setReference('')
  }

  return (
    <Section id="payment" tone="soft">
      <Fade className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-sm font-eng font-semibold tracking-widest uppercase text-brand-blue mb-4">
          Secure Payment
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight font-eng">
          Complete your payment securely
        </h2>
        <p className="text-gray-600 text-[15px] leading-relaxed font-eng">
          Enter the amount and currency provided by your <BrandText /> consultant to pay securely
          via PayPal — using your PayPal balance or any major credit card.
        </p>
      </Fade>

      <Fade className="max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm font-eng">
          {success && <SuccessPanel success={success} onReset={resetForm} />}
          {/* Keep the form/buttons container mounted at all times — only hide it on
              success so the PayPal buttons instance stays alive and is reusable after
              "Make another payment". */}
          <div className={success ? 'hidden' : ''}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <FormLabel htmlFor="pay-amount" required className="mb-0">
                    Payment amount
                  </FormLabel>
                  <div
                    className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5"
                    role="group"
                    aria-label="Payment currency"
                  >
                    {CURRENCY_CODES.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setCurrency(code)}
                        disabled={status === 'processing'}
                        aria-pressed={currency === code}
                        className={cn(
                          'px-3 py-1 text-xs font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                          currency === code
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600',
                        )}
                      >
                        {CURRENCIES[code].symbol} {code}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {symbolFor(currency)}
                  </span>
                  <Input
                    id="pay-amount"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 pr-14"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    {currency}
                  </span>
                </div>
                {amount && !amountValid && (
                  <p className="mt-2 text-xs text-red-600">
                    Please enter an amount between {symbolFor(currency)}
                    {MIN_AMOUNT.toLocaleString()} and {symbolFor(currency)}
                    {MAX_AMOUNT.toLocaleString()} {currency}.
                  </p>
                )}
                {amountValid && (
                  <p className="mt-2 text-sm text-gray-700">
                    You will pay:{' '}
                    <span className="font-bold">
                      {symbolFor(currency)}
                      {parsed.toFixed(2)} {currency}
                    </span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <FormLabel htmlFor="pay-name">Name / Company</FormLabel>
                  <Input
                    id="pay-name"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <FormLabel htmlFor="pay-email">Email</FormLabel>
                  <Input
                    id="pay-email"
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="mb-6">
                <FormLabel htmlFor="pay-ref">Reference / Quote no.</FormLabel>
                <Input
                  id="pay-ref"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Quote number from your consultant (optional)"
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-600 mb-4" role="alert">
                  {errorMsg}
                </p>
              )}
              {status === 'processing' && (
                <p className="text-sm text-gray-600 mb-4">
                  Finalizing your payment… please keep this window open.
                </p>
              )}
              {sdkState === 'unconfigured' && (
                <p className="text-sm text-gray-500 mb-2">
                  Payment is not configured yet. (VITE_PAYPAL_CLIENT_ID required)
                </p>
              )}
              {sdkState === 'error' && (
                <p className="text-sm text-red-600 mb-2">
                  Couldn't load the payment module. Please check your connection and refresh.
                </p>
              )}
              {sdkState === 'loading' && (
                <p className="text-sm text-gray-400 mb-2">Loading payment module…</p>
              )}

              {/* PayPal buttons render here; disabled until a valid amount is entered. */}
              <div className={amountValid ? '' : 'opacity-50'}>
                <div ref={containerRef} />
              </div>
              {sdkState === 'ready' && !amountValid && (
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Enter an amount to activate the payment buttons.
                </p>
              )}

              <p className="mt-6 text-xs text-gray-400 leading-relaxed">
                By paying, you agree to our{' '}
                <a
                  href="/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-blue"
                >
                  Payment &amp; Refund Policy
                </a>
                . Payments are processed securely by PayPal; <BrandText /> never stores your card
                details. Your consultant will confirm receipt after payment.
              </p>
          </div>
        </div>
      </Fade>
    </Section>
  )
}

function SuccessPanel({ success, onReset }) {
  const pending = success.status === 'pending'
  const amountLabel =
    success.amount != null
      ? `${symbolFor(success.currency)}${Number(success.amount).toFixed(2)} ${success.currency ?? ''}`.trim()
      : null

  return (
    <div className="text-center">
      <div
        className={cn(
          'inline-flex items-center justify-center w-14 h-14 rounded-full mb-6',
          pending ? 'bg-amber-500/10 text-amber-600' : 'bg-brand-green/10 text-brand-green',
        )}
      >
        {pending ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {pending ? 'Payment received — under review' : 'Payment complete'}
      </h3>
      {amountLabel && (
        <p className="text-sm text-gray-600 mb-1">
          {pending ? 'Amount submitted' : 'Amount paid'} <span className="font-bold">{amountLabel}</span>
        </p>
      )}
      {success.capture_id && (
        <p className="text-xs text-gray-400 mb-6">Transaction ID {success.capture_id}</p>
      )}
      <p className="text-sm text-gray-600 mb-8">
        {pending
          ? 'Your payment is being reviewed by PayPal and will be confirmed shortly. Your consultant will follow up.'
          : 'A receipt has been sent to your PayPal email. Your consultant will follow up shortly.'}
      </p>
      <Button type="button" variant="ghost" size="sm" onClick={onReset}>
        Make another payment
      </Button>
    </div>
  )
}
