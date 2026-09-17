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
  form: "Hi GoReallyBig, I'd like to discuss my website needs.",
};

const WEBP_ASSETS = new Set([
  'auto-drive-motors.png',
  'c04-hero.png',
  'c04-school-mockup.png',
  'c06-problem.png',
  'c07-promise.png',
  'c14-about.png',
  'c16-hospitality.png',
  'c18-local-business.png',
  'c19-professional-services.png',
  'c22-logo-light.png',
  'c23-logo-dark.png',
  'nav-logo.png',
  'footer-logo-transparent.png',
  'willow-creek-academy.png',
]);

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

function optimizeImages(html) {
  return html.replace(/<picture class="grb-picture">\s*(<img\b[^>]*?src="assets\/([^"]+\.png)"[^>]*>)\s*<\/picture>/gi, (full, img, filename) => {
    if (!WEBP_ASSETS.has(filename)) return full;
    const webp = filename.replace(/\.png$/i, '.webp');
    return `<picture class="grb-picture"><source srcset="/assets/${webp}" type="image/webp" />${img}</picture>`;
  });
}

function optimizeHeroImage(html) {
  return html.replace(
    /(<div class="hero-visual">\s*<picture class="grb-picture">\s*<source[^>]+>\s*<img\b[^>]*?src="assets\/c04-hero\.png"[^>]*)(\/?>)/i,
    '$1 loading="eager" fetchpriority="high" decoding="async"$2',
  );
}

function lazyLoadBelowFoldImages(html) {
  return html.replace(/<img\b(?![^>]*\bloading=)(?![^>]*\bclass="logo"\b)([^>]*?src="(?:assets\/|\/assets\/)[^"]+"[^>]*)\/>/gi, '<img$1 loading="lazy" />');
}

function optimizeContactActions(html) {
  return html
    .replace(/<div class="contact-detail"><b>Email<\/b><span>info@goreallybig\.com<\/span><\/div>/g,
      '<div class="contact-detail"><b>Email</b><a class="contact-email" href="mailto:info@goreallybig.com">info@goreallybig.com</a></div>')
    .replace(/<div class="contact-detail"><b>WhatsApp<\/b><span>0701 728 5626<\/span><\/div>/g,
      `<div class="contact-detail"><b>WhatsApp</b><a class="contact-whatsapp" href="${WA_BASE}?text=${encodeURIComponent(WA_MESSAGES.header)}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +234 701 728 5626"><img src="/assets/whatsapp-icon-outline.svg" alt="" aria-hidden="true" /><span>+234 701 728 5626</span></a></div>`)
    .replace(/<a class="wa-link" data-wa-form="([^"]+)"[^>]*>[\s\S]*?<\/a>/gi,
      (full, formType) => `<a class="wa-link" data-wa-form="${formType}" href="${WA_BASE}?text=${encodeURIComponent(WA_MESSAGES.form)}" target="_blank" rel="noopener noreferrer" aria-label="Prefer WhatsApp? Start a chat at +234 701 728 5626"><span class="wa-dot" aria-hidden="true"><img src="/assets/whatsapp-icon-outline.svg" alt="" /></span><span class="wa-link-copy">Prefer WhatsApp? <strong>Start a chat instead.</strong></span><span class="wa-number">+234 701 728 5626</span></a>`)
    .replace(/WhatsApp: 0701 728 5626/g, '+234 701 728 5626');
}

function addWorkNavigation(html) {
  return html.replace(
    /(<div class="showcase-media">)/i,
    '$1<button class="work-nav work-nav-prev" type="button" data-work-nav="prev" aria-label="Previous project">‹</button><button class="work-nav work-nav-next" type="button" data-work-nav="next" aria-label="Next project">›</button>',
  );
}

function getBody(source) {
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error('Production body could not be extracted.');

  let body = match[1]
    .replace(/<script[^>]+src=["']assets\/app\.js["'][^>]*><\/script>/gi, '')
    .replace(/<a data-nav="faq" href="#faq">FAQ<\/a>/g, '')
    .replace(/<a href="#faq">FAQ<\/a>/g, '')
    .replace(/(<h1[^>]*>Your Business )Is /, '$1<br class="grb-h1-break" />Is ')
    .replace(/<a aria-label="Chat on WhatsApp at 0701 728 5626" class="contact-mini" data-wa-context="header" href="https:\/\/wa\.me\/2347017285626" rel="noopener noreferrer" target="_blank"><span class="wa">WA<\/span><span>0701 728 5626<\/span><\/a>/g, `<a aria-label="Chat on WhatsApp at +234 701 728 5626" class="contact-mini" data-wa-context="header" href="${WA_BASE}?text=${encodeURIComponent(WA_MESSAGES.header)}" rel="noopener noreferrer" target="_blank"><span class="wa" aria-hidden="true"><img class="grb-wa-img" src="/assets/whatsapp-icon-outline.svg" alt="" /></span><span>+234 701 728 5626</span></a>`)
    .replace(/<span class="wa">WA<\/span>/g, '<span class="wa" aria-hidden="true"><img class="grb-wa-img" src="/assets/whatsapp-icon-outline.svg" alt="" /></span>')
    .replace(/<a href="https:\/\/wa\.me\/2347017285626" rel="noopener noreferrer" target="_blank">WhatsApp: 0701 728 5626<\/a>/g, `<a class="grb-mobile-wa" href="${WA_BASE}?text=${encodeURIComponent(WA_MESSAGES.header)}" rel="noopener noreferrer" target="_blank" aria-label="Chat on WhatsApp at +234 701 728 5626 with a prefilled message"><span>+234 701 728 5626</span><img class="grb-wa-icon" src="/assets/whatsapp-icon-outline.svg" alt="" /></a>`);

  body = optimizeContactActions(body);
  body = preloadWhatsAppLinks(body);
  body = addWorkNavigation(body);
  body = optimizeImages(body);
  body = optimizeHeroImage(body);
  body = lazyLoadBelowFoldImages(body);

  return body.trim();
}

export default function Home() {
  const body = getBody(getProductionSource());

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <script src="/assets/app-core.js" defer />
      <script src="/assets/work-nav.js" defer />
    </>
  );
}
