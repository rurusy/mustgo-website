import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrandText, Button } from '../components/ui'
import { cn } from '../design/cn'

// Friendly, detailed English manual for overseas customers explaining how to pay
// via PayPal after clicking "Pay Online". Companion to /pay. Reached from the
// payment page (and a link a consultant can share directly).
//
// The step visuals are stylised mock-ups of the real screens (rendered in the
// browser), so the whole flow — including PayPal's own window, which can't be
// screenshotted directly — is illustrated consistently and never goes stale.

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-eng font-semibold tracking-widest uppercase text-brand-blue mb-3">
      {children}
    </p>
  )
}

function SectionTitle({ children, className }) {
  return (
    <h2 className={cn('text-xl sm:text-2xl font-bold text-gray-900 tracking-tight font-eng', className)}>
      {children}
    </h2>
  )
}

// A stylised "screenshot" frame so customers recognise the actual screens.
function MockFrame({ caption, children, className }) {
  return (
    <figure className={cn('my-5', className)}>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
      {caption && <figcaption className="mt-2 text-center text-xs text-gray-400">{caption}</figcaption>}
    </figure>
  )
}

// --- Screen mock-ups (mirror the real /pay + PayPal UI) --------------------

function MockHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">
        <span className="text-brand-green">M</span>ust<span className="text-brand-blue">g</span>o
      </span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 hidden sm:inline">KOR · ENG</span>
        <span className="inline-flex items-center rounded-sm bg-brand-blue text-white text-xs font-semibold px-4 py-2">
          Pay Online
        </span>
      </div>
    </div>
  )
}

function MockAmount() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-700">Payment amount</span>
        <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded bg-white text-gray-900 shadow-sm">$ USD</span>
          <span className="px-2.5 py-1 text-gray-400">€ EUR</span>
        </div>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
        <div className="h-11 rounded-md border border-gray-300 flex items-center pl-7 pr-12 text-gray-900 text-sm">
          500.00
        </div>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">USD</span>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        You will pay: <span className="font-bold">$500.00 USD</span>
      </p>
    </div>
  )
}

function MockPayButtons() {
  return (
    <div className="space-y-2.5 max-w-xs mx-auto">
      <div className="h-11 rounded-md bg-[#ffc439] flex items-center justify-center">
        <span className="text-[15px] font-bold italic tracking-tight">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#0070e0]">Pal</span>
        </span>
      </div>
      <div className="h-11 rounded-md bg-black flex items-center justify-center">
        <span className="text-white text-[13px] font-semibold">Debit or Credit Card</span>
      </div>
    </div>
  )
}

function MockPayPalWindow() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-center gap-1.5 pb-3 mb-4 border-b border-gray-100 text-gray-500 text-xs">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 21v-6a2.25 2.25 0 0 1 2.25-2.25Z" />
        </svg>
        <span className="font-medium">paypal.com</span>
      </div>
      <div className="rounded-md border border-gray-200 p-3.5 mb-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">Pay with your PayPal account</p>
        <div className="h-8 rounded bg-gray-100 mb-2" />
        <div className="h-8 rounded bg-gray-100" />
      </div>
      <div className="relative text-center my-3">
        <span className="relative z-10 bg-white px-3 text-xs text-gray-400">or</span>
        <span className="absolute inset-x-0 top-1/2 border-t border-gray-100" />
      </div>
      <div className="rounded-md border-2 border-brand-blue/40 p-3.5 flex items-center gap-2.5">
        <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 9.5h19" />
        </svg>
        <span className="text-xs font-semibold text-gray-800">Pay with Debit or Credit Card</span>
      </div>
    </div>
  )
}

function MockSuccess() {
  return (
    <div className="text-center py-1">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/10 text-brand-green mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className="text-base font-bold text-gray-900 mb-1">Payment complete</h4>
      <p className="text-sm text-gray-600">
        Amount paid <span className="font-bold">$500.00 USD</span>
      </p>
      <p className="text-xs text-gray-400 mt-1">Transaction ID 3AB12345CD6789012</p>
    </div>
  )
}

// One numbered step in the walkthrough.
function Step({ n, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-brand-blue text-white text-sm font-bold font-eng">
        {n}
      </span>
      <div className="pt-1 min-w-0 flex-1">
        <h3 className="text-[15px] font-bold text-gray-900 mb-1">{title}</h3>
        <div className="text-[15px] text-gray-600 leading-relaxed space-y-2">{children}</div>
      </div>
    </li>
  )
}

function Faq({ q, children }) {
  return (
    <div className="border-b border-gray-100 py-5">
      <h3 className="text-[15px] font-bold text-gray-900 mb-2">{q}</h3>
      <div className="text-[15px] text-gray-600 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        className="w-5 h-5 flex-shrink-0 text-brand-green mt-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span>{children}</span>
    </li>
  )
}

export default function PayGuidePage() {
  useEffect(() => {
    // Utility/help page — keep it out of search results.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'How to Pay · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/en" className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <Link
            to="/pay"
            className="text-sm font-eng font-medium text-gray-500 hover:text-brand-blue transition-colors"
          >
            ← Back to payment
          </Link>
        </div>
      </header>

      <main className="flex-grow font-eng">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {/* Intro */}
          <Eyebrow>Payment Guide</Eyebrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            How to pay online — step by step
          </h1>
          <p className="mt-5 text-gray-600 text-base leading-relaxed">
            Paying <BrandText /> is quick, secure, and takes about two minutes. You can pay with any
            major credit or debit card —{' '}
            <strong className="text-gray-900">a PayPal account is optional</strong>. This guide walks
            you through exactly what to expect, with a picture of every screen.
          </p>

          {/* What you'll need */}
          <section className="mt-12">
            <SectionTitle>What you&apos;ll need</SectionTitle>
            <ul className="mt-5 space-y-3 text-[15px] text-gray-700">
              <CheckItem>
                The <strong className="text-gray-900">exact amount</strong> and{' '}
                <strong className="text-gray-900">currency</strong> (USD or EUR) from your
                consultant&apos;s quote.
              </CheckItem>
              <CheckItem>Your quote / reference number (optional, but helpful).</CheckItem>
              <CheckItem>
                A credit or debit card <span className="text-gray-400">— or —</span> a PayPal account.
              </CheckItem>
            </ul>
          </section>

          {/* Two ways to pay */}
          <section className="mt-14">
            <SectionTitle>Two ways to pay</SectionTitle>
            <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">
              Both options go through PayPal&apos;s secure checkout. Pick whichever suits you.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-brand-blue/10 text-brand-blue mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2.5" y="5" width="19" height="14" rx="2" />
                    <path d="M2.5 9.5h19" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">Pay with a card</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use any major credit or debit card as a guest. No PayPal sign-up required.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-brand-blue/10 text-brand-blue mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 10c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6s-2.7 6-6 6H9" />
                    <path d="M3 10v8" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">Pay with PayPal</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log in to your PayPal account and pay from your balance or a linked card.
                </p>
              </div>
            </div>
          </section>

          {/* Step by step */}
          <section className="mt-14">
            <SectionTitle>Step by step</SectionTitle>
            <p className="mt-3 text-[15px] text-gray-500 leading-relaxed">
              The pictures below illustrate each screen (amounts shown are just an example).
            </p>
            <ol className="mt-7 space-y-9">
              <Step n={1} title="Open the payment page">
                <p>
                  On our English site, click <strong className="text-gray-900">Pay Online</strong> in
                  the top menu — or simply open the link your consultant shares with you:{' '}
                  <span className="text-brand-blue font-medium">mustgokorea.co.kr/pay</span>.
                </p>
                <MockFrame caption="The “Pay Online” button, top-right of our English site">
                  <MockHeader />
                </MockFrame>
              </Step>

              <Step n={2} title="Enter the amount and choose the currency">
                <p>
                  Type the <strong className="text-gray-900">exact amount</strong> from your quote and
                  select the currency — <strong className="text-gray-900">USD</strong> or{' '}
                  <strong className="text-gray-900">EUR</strong>. A “You will pay” line appears so you
                  can double-check it before continuing.
                </p>
                <MockFrame caption="Enter your amount — the total is confirmed below the field">
                  <MockAmount />
                </MockFrame>
              </Step>

              <Step n={3} title="Add your details (optional)">
                <p>
                  You can add your name / company, email, and quote reference number. These are
                  optional, but we recommend adding your{' '}
                  <strong className="text-gray-900">email</strong> so PayPal can send you a receipt.
                </p>
              </Step>

              <Step n={4} title="Click the yellow PayPal button">
                <p>
                  This opens PayPal&apos;s secure payment window. You can pay with your PayPal account,
                  or choose the card button to pay as a guest. Your card details are entered on PayPal
                  — <strong className="text-gray-900">never on our site</strong>.
                </p>
                <MockFrame caption="Tap the yellow PayPal button, or the card button below it">
                  <MockPayButtons />
                </MockFrame>
              </Step>

              <Step n={5} title="Choose how to pay">
                <p>In the PayPal window you can either:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong className="text-gray-900">Log in to your PayPal account</strong> and pay
                    from there, or
                  </li>
                  <li>
                    Click <strong className="text-gray-900">“Pay with Debit or Credit Card”</strong> and
                    enter your card as a guest.
                  </li>
                </ul>
                <MockFrame caption="PayPal's secure window — log in, or pay by card as a guest">
                  <MockPayPalWindow />
                </MockFrame>
              </Step>

              <Step n={6} title="Review and confirm">
                <p>
                  Check that the amount is correct, then confirm the payment. It only takes a moment to
                  process — please keep the window open.
                </p>
              </Step>

              <Step n={7} title="You're done">
                <p>
                  You&apos;ll see a <strong className="text-gray-900">“Payment complete”</strong> screen
                  with a transaction ID, and PayPal emails you a receipt. Your consultant is notified
                  and will confirm receipt and follow up with the next steps.
                </p>
                <MockFrame caption="The confirmation screen — with your transaction ID">
                  <MockSuccess />
                </MockFrame>
              </Step>
            </ol>
          </section>

          {/* After you pay */}
          <section className="mt-14">
            <div className="bg-white rounded-lg border border-gray-200 p-7">
              <SectionTitle className="!text-lg">After you pay</SectionTitle>
              <ul className="mt-4 space-y-3 text-[15px] text-gray-700">
                <CheckItem>An on-screen confirmation with your transaction ID.</CheckItem>
                <CheckItem>A receipt email from PayPal.</CheckItem>
                <CheckItem>Your consultant confirms receipt and continues your booking.</CheckItem>
                <CheckItem>Keep the transaction ID for your records, just in case.</CheckItem>
              </ul>
            </div>
          </section>

          {/* Security */}
          <section className="mt-14">
            <div className="flex items-start gap-4 rounded-lg bg-brand-blue/[0.04] border border-brand-blue/10 p-6">
              <svg className="w-7 h-7 flex-shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
              </svg>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">Your payment is secure</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  All payments are processed by <strong className="text-gray-900">PayPal</strong>, a
                  global leader in online payments. <BrandText /> never sees or stores your card
                  number. In the payment window, you can confirm you&apos;re on{' '}
                  <span className="font-medium">paypal.com</span> and look for the padlock in your
                  browser.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ / troubleshooting */}
          <section className="mt-14">
            <SectionTitle>Troubleshooting &amp; FAQ</SectionTitle>
            <div className="mt-4">
              <Faq q="Do I need a PayPal account?">
                <p>
                  No. You can pay with a credit or debit card as a guest — a PayPal account is optional.
                </p>
              </Faq>

              <Faq q="I don't see the “Pay with Card” option.">
                <p>
                  Depending on your country and bank, PayPal sometimes shows only the login screen. You
                  can still pay by signing in to — or quickly creating — a PayPal account. If you&apos;re
                  stuck, contact us and we&apos;ll help.
                </p>
              </Faq>

              <Faq q="My card was declined. What can I do?">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Try a different credit or debit card.</li>
                  <li>Make sure international / online payments are enabled with your bank.</li>
                  <li>Or pay using a PayPal account instead.</li>
                </ul>
                <p>
                  Please note: some locally-issued cards — for example, certain cards issued in Korea —
                  are not supported by PayPal for this type of payment. In that case, please use an
                  internationally-enabled card or a PayPal account. If it keeps failing, contact your
                  consultant and we&apos;ll find the best way for you.
                </p>
              </Faq>

              <Faq q="Which currencies can I pay in?">
                <p>USD or EUR — choose at checkout, or as stated in your quote.</p>
              </Faq>

              <Faq q="Is it safe to enter my card?">
                <p>Yes. PayPal handles the payment securely and we never receive your card details.</p>
              </Faq>

              <Faq q="I entered the wrong amount.">
                <p>
                  If you haven&apos;t paid yet, just correct the amount before continuing. If you&apos;ve
                  already paid, contact us right away and we&apos;ll sort it out under our{' '}
                  <Link to="/policy" className="text-brand-blue hover:underline">
                    Payment &amp; Refund Policy
                  </Link>
                  .
                </p>
              </Faq>

              <Faq q="I didn't receive a receipt.">
                <p>
                  Check your spam folder first. The receipt is sent to your PayPal email (or the email
                  you entered at checkout). Still nothing? Contact us and we&apos;ll confirm your
                  payment.
                </p>
              </Faq>
            </div>
          </section>

          {/* Need help / CTA */}
          <section className="mt-14">
            <div className="rounded-lg bg-ink-900 p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Still have a question?</h2>
              <p className="text-gray-300 text-[15px] leading-relaxed mb-6">
                Your <BrandText />&nbsp;consultant is happy to help you through the payment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <a
                  href="mailto:wemustgo@mustgokorea.com"
                  className="text-gray-200 hover:text-amber-500 transition-colors"
                >
                  wemustgo@mustgokorea.com
                </a>
                <span className="hidden sm:inline text-gray-600">·</span>
                <a href="tel:+8215515992" className="text-gray-200 hover:text-amber-500 transition-colors">
                  +82-1551-5992
                </a>
              </div>
              <div className="mt-7">
                <Button as={Link} to="/pay" variant="blueSolid" size="md" font="eng">
                  Go to payment →
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-ink-900 py-10 border-t border-white/10">
        <div className="max-w-layout mx-auto px-6 lg:px-12 flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              <BrandText /> — Your Trusted Partner in Two-Way Business Travel.
            </p>
            <p className="text-xs text-gray-600 font-eng">Mustgo Co., Ltd. · Business Reg. 618-81-35992</p>
            <p className="text-xs text-gray-600 font-eng">
              Mail-Order Business Reg. No. 2026-대구수성구-0781
            </p>
          </div>
          <div className="text-sm font-eng">
            <Link to="/pay" className="block text-gray-300 hover:text-amber-500 transition-colors">
              Make a payment
            </Link>
            <Link to="/policy" className="block mt-1 text-gray-400 hover:text-amber-500 transition-colors">
              Payment &amp; Refund Policy
            </Link>
            <p className="text-xs text-gray-600 mt-1">© 2026 Mustgo Co., Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
