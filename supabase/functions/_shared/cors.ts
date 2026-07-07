// 브라우저에서 직접 호출되는 Edge Function 용 공용 CORS 헬퍼.
// (inquiry-email 은 Database Webhook 서버-투-서버 호출이라 CORS 가 필요 없지만,
//  paypal-* 함수는 홈페이지에서 fetch 되므로 preflight 처리가 필요합니다.)

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
