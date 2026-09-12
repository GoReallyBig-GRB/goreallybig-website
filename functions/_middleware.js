export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;
  const html = await response.text();
  return new Response(html.replace('</body>', '<script src="/assets/proxy-client.js" defer></script></body>'), response);
}
