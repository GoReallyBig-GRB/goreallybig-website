import fs from 'node:fs';
import './globals.css';

export const metadata = {
  title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
  description: 'Professional website design and website makeovers for Nigerian businesses. GoReallyBig builds websites that make businesses easier to find, trust and choose.',
  robots: 'index, follow',
  alternates: { canonical: 'https://goreallybig.com/' },
  icons: { icon: '/assets/favicon.png', apple: '/assets/favicon.png' },
  openGraph: {
    type: 'website', siteName: 'GoReallyBig',
    title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
    description: 'Professional website design and website makeovers for Nigerian businesses.',
    url: 'https://goreallybig.com/', images: [{ url: 'https://goreallybig.com/assets/favicon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
    description: 'Professional website design and website makeovers for Nigerian businesses.',
    images: ['https://goreallybig.com/assets/favicon.png'],
  },
};

export const viewport = {
  themeColor: '#155EEF',
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function getProductionStyles() {
  const source = read('index.html');
  const inline = [...source.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1]).join('\n');
  const productionCss = [
    read('assets/body-copy.css'),
    read('assets/hero-composition.css'),
    read('assets/hero-composition-v2.css')
      .replaceAll("url('whatsapp-icon-outline.svg')", "url('/assets/whatsapp-icon-outline.svg')"),
  ].join('\n');
  const runtimePresentation = `
@media(max-width:900px){
  .menu[aria-expanded="true"]{font-size:0!important}
  .menu[aria-expanded="true"]::before{content:"×"!important;font-size:30px!important;line-height:1;display:block!important}
  .mobile-panel>a.grb-mobile-wa{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;font-size:16px!important;color:var(--navy)!important;padding-top:16px!important;padding-bottom:16px!important}
  .mobile-panel>a.grb-mobile-wa::before,.mobile-panel>a.grb-mobile-wa::after{content:none!important;display:none!important}
  .grb-wa-icon{width:28px;height:28px;display:block;flex:0 0 28px;order:2}
  .grb-header-wa-icon{width:31px;height:31px;display:block}
}
@media(min-width:901px){.grb-header-wa-icon{width:31px;height:31px;display:block}}
.grb-wa-dot-icon{width:24px;height:24px;display:block;flex:0 0 24px}
.grb-wa-img{width:100%;height:100%;display:block;object-fit:contain}
.wa{background:transparent!important;color:transparent!important}
.wa:empty{display:block}

.contact-detail a{color:#aebacc;text-decoration:none;font-size:15px;line-height:1.65;display:inline-flex;align-items:center;gap:8px;min-height:28px}
.contact-detail a:hover{color:#fff;text-decoration:underline}
.contact-detail a:focus-visible{outline:2px solid var(--lime);outline-offset:4px;border-radius:4px}
.contact-detail .contact-whatsapp img{width:22px;height:22px;display:block;flex:0 0 22px}
.contact-detail .contact-whatsapp{font-weight:700}

/* FORM — single authoritative implementation. */
.form-intro,.modal-fields .form-intro{display:grid!important;gap:4px!important;margin:0 0 14px!important}
.form-intro-heading,.modal-fields .form-intro-heading{margin:0!important;color:var(--navy)!important;font-size:clamp(30px,4vw,42px)!important;font-weight:800!important;line-height:1.08!important;letter-spacing:-.035em!important}
.form-intro span,.modal-fields .form-intro span{color:#667085!important;font-size:13px!important;line-height:1.55!important}
.form .wa-link,.modal-fields .wa-link{display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;width:max-content!important;max-width:100%!important;min-height:30px!important;margin:0 0 16px!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#087f5b!important;font-size:13px!important;font-weight:800!important;text-decoration:none!important;cursor:pointer!important}
.form .wa-link:hover,.modal-fields .wa-link:hover{text-decoration:underline!important;color:#087f5b!important;background:transparent!important;transform:none!important;box-shadow:none!important}
.form .wa-link:focus-visible,.modal-fields .wa-link:focus-visible{outline:2px solid var(--blue)!important;outline-offset:4px!important;border-radius:4px!important}
.form .wa-form-icon,.modal-fields .wa-form-icon{width:24px!important;height:24px!important;flex:0 0 24px!important;display:block!important}
.form .wa-link-copy,.modal-fields .wa-link-copy{display:flex!important;align-items:center!important;gap:4px!important;line-height:1.35!important}
.form .wa-link-copy strong,.modal-fields .wa-link-copy strong{font-weight:800!important}
.form-continue,.modal-fields .form-continue{margin:0 0 7px!important;color:var(--navy)!important;font-size:12px!important;font-weight:800!important}
.form .form-required-note,.modal-fields .form-required-note{margin:0 0 12px!important;color:#667085!important;font-size:11px!important;line-height:1.45!important}
.form .form-actions{margin-top:14px!important}
.form .form-actions .cta,.modal-fields>.cta{width:100%!important;min-height:50px!important;border-radius:12px!important;box-shadow:none!important;font-weight:800!important}
.contact .form{padding:22px!important;border-radius:22px!important}
.contact .form .fields{gap:12px!important}
.contact .form .field label{margin-bottom:5px!important}
.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:11px 13px!important}
.contact .form .field textarea{min-height:100px!important}
@media(max-width:900px){.contact .form{padding:20px!important;border-radius:20px!important}}
@media(max-width:560px){.contact .form{padding:17px!important;border-radius:18px!important}.contact .form .wa-link{margin-bottom:15px!important}.contact .form .wa-link-copy{font-size:11px!important}.contact .form .fields{gap:10px!important}.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:10px 12px!important}.contact .form .field textarea{min-height:90px!important}}
/* Social icons — static SVGs in the document; CSS only. */
.footer-socials a{width:38px!important;height:38px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.16)!important;border-radius:11px!important;background:rgba(255,255,255,.035)!important;color:#dbe4ee!important;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:rgba(183,240,0,.55)!important;background:rgba(183,240,0,.06)!important;color:var(--lime)!important}
.footer-socials a:focus-visible{outline:2px solid var(--lime)!important;outline-offset:3px!important}
.footer-socials .grb-social-icon{width:18px;height:18px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:19px;height:19px}
/* Hero mockup carousel: deterministic first paint, one shared visual frame. */
.grb-hero-carousel{
  position:relative!important;
  width:100%!important;
}
.grb-hero-carousel .hero-carousel-image{
  display:block!important;
  width:100%!important;
  height:auto!important;
  max-width:none!important;
  margin:0!important;
  opacity:1!important;
  transition:opacity .18s ease!important;
}
.grb-hero-carousel .hero-carousel-image.is-changing{opacity:0!important}
`;
  return [inline, productionCss, runtimePresentation].join('\n');
}

export default function RootLayout({ children }) {
  const styles = getProductionStyles();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

<style>
/* FORM REFINEMENT — compact field rhythm and proportionate WhatsApp action. */
.form .wa-form-icon,.modal-fields .wa-form-icon{
  width:18px!important;
  height:18px!important;
  flex:0 0 18px!important;
}
.form .wa-link,.modal-fields .wa-link{
  min-height:24px!important;
  gap:7px!important;
  font-size:12px!important;
  line-height:1.3!important;
}
.form .wa-link-copy,.modal-fields .wa-link-copy{
  font-size:12px!important;
  white-space:normal!important;
}
.form .fields{
  gap:11px!important;
}
.form .field label{
  margin-bottom:4px!important;
  font-size:12px!important;
  line-height:1.25!important;
}
.form .field input,
.form .field textarea,
.form .field select{
  padding:10px 12px!important;
}
.form .field textarea{
  min-height:82px!important;
}
.form .need{
  gap:6px!important;
}
.form .need button{
  padding:9px 11px!important;
  font-size:12px!important;
}
.form .form-actions{
  margin-top:14px!important;
}
.modal-fields{
  gap:10px!important;
}
.modal-fields .field label{
  margin-bottom:4px!important;
  font-size:12px!important;
}
.modal-fields .field input,
.modal-fields .field textarea,
.modal-fields .field select{
  padding:10px 12px!important;
}
.modal-fields .field textarea{
  min-height:78px!important;
}
.modal-fields .need button{
  padding:9px 11px!important;
  font-size:12px!important;
}
</style>
