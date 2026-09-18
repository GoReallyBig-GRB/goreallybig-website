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

/* Premium WhatsApp form CTA: compact, full-width, white with a restrained green outline. */
.form .wa-link,.modal-fields .wa-link{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;width:100%!important;box-sizing:border-box!important;min-height:50px!important;padding:10px 15px!important;margin-top:12px!important;margin-bottom:18px!important;border:1.5px solid #25d366!important;border-radius:12px!important;background:#fff!important;color:#087f5b!important;text-decoration:none!important;cursor:pointer!important;box-shadow:none!important;transition:background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease,transform .15s ease!important}
.form .wa-link:hover,.modal-fields .wa-link:hover{background:#effff5!important;color:#087f5b!important;border-color:#25d366!important;box-shadow:0 6px 18px rgba(37,211,102,.12)!important;transform:translateY(-1px)!important}
.form .wa-link:active,.modal-fields .wa-link:active{transform:translateY(0)!important;box-shadow:none!important}
.form .wa-link:focus-visible,.modal-fields .wa-link:focus-visible{outline:3px solid rgba(21,94,239,.25)!important;outline-offset:3px!important}
.form .wa-link-copy,.modal-fields .wa-link-copy{min-width:0!important;font-size:13px!important;line-height:1.3!important;font-weight:700!important;white-space:nowrap!important;color:inherit!important}
.form .wa-link-copy strong,.modal-fields .wa-link-copy strong{font-weight:800!important}
.form .wa-number,.modal-fields .wa-number{display:inline-flex!important;align-items:center!important;gap:7px!important;margin-left:auto!important;flex:0 0 auto!important;font-size:12px!important;line-height:1.2!important;font-weight:800!important;white-space:nowrap!important;color:#128c7e!important;text-decoration:underline!important;text-underline-offset:3px!important;text-decoration-thickness:1px!important;transition:color .2s ease!important}
.form .wa-number img,.modal-fields .wa-number img{width:22px!important;height:22px!important;display:block!important;flex:0 0 22px!important}
.form .wa-link:hover .wa-number,.modal-fields .wa-link:hover .wa-number{color:#075f4e!important}

/* Compact the contact form so it remains a focused conversion panel. */
.contact .form{padding:22px!important;border-radius:22px!important}
.contact .form .form-required-note{margin:0 0 10px!important}
.contact .form .wa-link{margin-top:0!important;margin-bottom:18px!important}
.contact .form .fields{gap:12px!important}
.contact .form .field label{margin-bottom:5px!important}
.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:11px 13px!important}
.contact .form .field textarea{min-height:100px!important}
.contact .form .form-actions{margin-top:14px!important}
.contact .form .form-note{margin-top:8px!important}

/* Social icons: compact, restrained and consistent with the production visual language. */
.footer-socials a{width:38px!important;height:38px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.16)!important;border-radius:11px!important;background:rgba(255,255,255,.035)!important;color:#dbe4ee!important;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:rgba(183,240,0,.55)!important;background:rgba(183,240,0,.06)!important;color:var(--lime)!important}
.footer-socials a:focus-visible{outline:2px solid var(--lime)!important;outline-offset:3px!important}
.footer-socials .grb-social-icon{width:18px;height:18px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:19px;height:19px}

@media(max-width:900px){
  .contact .form{padding:20px!important;border-radius:20px!important}
}

@media(max-width:560px){
  .contact .form{padding:17px!important;border-radius:18px!important}
  .contact .form .wa-link{min-height:48px!important;padding:9px 12px!important;margin-bottom:15px!important;border-radius:10px!important}
  .contact .form .wa-link-copy{font-size:11px!important}
  .contact .form .wa-number{font-size:10px!important;gap:5px!important}
  .contact .form .wa-number img{width:20px!important;height:20px!important;flex-basis:20px!important}
  .contact .form .fields{gap:10px!important}
  .contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:10px 12px!important}
  .contact .form .field textarea{min-height:90px!important}
}
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
