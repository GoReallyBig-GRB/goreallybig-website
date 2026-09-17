import fs from 'node:fs';

const WA_BASE = 'https://wa.me/2347017285626';
const WA_MESSAGES = {
  header: "Hi GoReallyBig, I'd like to talk about a website for my business.",
  hero: "Hi GoReallyBig, I'd like to get started with a website for my business.",
  promise: "Hi GoReallyBig, I'd like to discuss a website that can help my business get found, build trust and win more business.",
  commercial: "Hi GoReallyBig, I'd like to talk about making sure my business is ready when people look me up online.",
  approach: "Hi GoReallyBig, I'd like to talk about a website built around my business, customers and goals.",
  process: "Hi GoReallyBig, I'd like to talk through getting my business from idea to online.",
  work: "Hi GoReallyBig, I'd like to discuss what my business website could look like.",
  faq: "Hi GoReallyBig, I have a few questions about getting a website for my business.",
};

function getProductionSource() {
  return fs.readFileSync('index.html', 'utf8');
}

function preloadWhatsAppLinks(html) {
  return html.replace(/(<a[^>]*data-wa-context="([^"]+)"[^>]*href=")https:\/\/wa\.me\/2347017285626("[^>]*>)/g, (full, prefix, context, suffix) => {
    const message = WA_MESSAGES[context];
    if (!message) return full;
    return `${prefix}${WA_BASE}?text=${encodeURIComponent(message)}${suffix}`;
  });
}

function getBody(source) {
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error('Production body could not be extracted.');

  let body = match[1]
    .replace(/<script[^>]+src=["']assets\/app\.js["'][^>]*><\/script>/gi, '')
    .replace(/<a data-nav="faq" href="#faq">FAQ<\/a>/, '')
    .replace(/<a href="#faq">FAQ<\/a>/, '')
    .replace(/<div class="contact-detail"><b>Email<\/b><span>info@goreallybig\.com<\/span><\/div>/, '<div class="contact-detail"><b>Email</b><a href="mailto:info@goreallybig.com">info@goreallybig.com</a></div>')
    .replace(/<span class="wa">WA<\/span>/g, '<span class="wa" aria-hidden="true"></span>')
    .replace('WhatsApp: 0701 728 5626', '0701 728 5626');

  body = preloadWhatsAppLinks(body);
  return body.trim();
}

export default function Home() {
  const body = getBody(getProductionSource());

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <script src="/assets/app-core.js" defer />
    </>
  );
}
