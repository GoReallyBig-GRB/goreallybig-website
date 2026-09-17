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
    // The old presentation bootstrap is intentionally removed; all static
    // refinements are now emitted during the build instead.
    .replace(/<script[^>]+src=["']assets\/app\.js["'][^>]*><\/script>/gi, '')
    // FAQ is a section, not a top-level navigation item.
    .replace(/<a data-nav="faq" href="#faq">FAQ<\/a>/g, '')
    .replace(/<a href="#faq">FAQ<\/a>/g, '')
    // Contact email is an actual mailto link in the new implementation.
    .replace(/<div class="contact-detail"><b>Email<\/b><span>info@goreallybig\.com<\/span><\/div>/g, '<div class="contact-detail"><b>Email</b><a href="mailto:info@goreallybig.com">info@goreallybig.com</a></div>')
    // Preserve the final production H1 line break at first paint; this used
    // to be inserted by app.js after the browser had already rendered.
    .replace(/(<h1[^>]*>Your Business )Is /, '$1<br class="grb-h1-break" />Is ')
    // Static WhatsApp artwork instead of the old "WA" text badge.
    .replace(/<span class="wa">WA<\/span>/g, '<span class="wa" aria-hidden="true"><img class="grb-wa-img" src="/assets/whatsapp-icon-outline.svg" alt="" /></span>')
    // Mobile menu WhatsApp is fully rendered, including the final number and
    // preloaded message, without waiting for JavaScript.
    .replace(/<a href="https:\/\/wa\.me\/2347017285626" rel="noopener noreferrer" target="_blank">WhatsApp: 0701 728 5626<\/a>/g, `<a class="grb-mobile-wa" href="${WA_BASE}?text=${encodeURIComponent(WA_MESSAGES.header)}" rel="noopener noreferrer" target="_blank" aria-label="Chat on WhatsApp at +234 701 728 5626 with a prefilled message"><span>+234 701 728 5626</span><img class="grb-wa-icon" src="/assets/whatsapp-icon-outline.svg" alt="" /></a>`)
    .replace(/WhatsApp: 0701 728 5626/g, '+234 701 728 5626');

  return preloadWhatsAppLinks(body).trim();
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
