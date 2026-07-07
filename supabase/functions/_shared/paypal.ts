// PayPal REST API 공용 헬퍼.
//
// Secrets (Edge Function Secrets 에 등록):
//   PAYPAL_CLIENT_ID   PayPal 앱 Client ID
//   PAYPAL_SECRET      PayPal 앱 Secret  ← 절대 프론트엔드/저장소에 두지 말 것
//   PAYPAL_ENV         'sandbox' (기본) | 'live'

export function paypalBase(): string {
  const env = (Deno.env.get('PAYPAL_ENV') ?? 'sandbox').toLowerCase()
  return env === 'live' || env === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}

// client_credentials 그랜트로 OAuth2 액세스 토큰 발급.
export async function getAccessToken(): Promise<string> {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID')
  const secret = Deno.env.get('PAYPAL_SECRET')
  if (!clientId || !secret) {
    throw new Error('PAYPAL_CLIENT_ID / PAYPAL_SECRET not configured')
  }

  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    throw new Error(`paypal oauth failed: ${res.status} ${await res.text()}`)
  }

  const json = await res.json()
  return json.access_token as string
}
