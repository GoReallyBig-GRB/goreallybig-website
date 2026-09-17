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

/* Our Work: remove the inner media card and give navigation its own clear side gutters. */
.showcase-media{position:relative!important;padding:0 76px!important;background:transparent!important;border-radius:0!important;overflow:visible!important;display:grid!important;place-items:center!important;min-height:620px!important}
.showcase-media .grb-picture{display:none!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;align-items:center!important;justify-content:center!important;background:transparent!important}
.showcase-media .grb-picture.active{display:flex!important}
.showcase-media .grb-picture img{display:block!important;width:100%!important;height:auto!important;max-height:620px!important;object-fit:contain!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}
.showcase-media .work-nav{position:absolute!important;top:50%!important;z-index:1000!important;width:46px!important;height:58px!important;display:grid!important;place-items:center!important;padding:0!important;border:1px solid rgba(11,31,58,.16)!important;border-radius:12px!important;background:#fff!important;color:var(--navy)!important;font-size:40px!important;font-weight:500!important;line-height:1!important;cursor:pointer!important;visibility:visible!important;opacity:1!important;box-shadow:0 8px 20px rgba(11,31,58,.12)!important;transform:translateY(-50%)!important;transition:transform .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease!important}
.showcase-media .work-nav:hover{background:#f5f8ff!important;border-color:rgba(21,94,239,.55)!important;box-shadow:0 12px 24px rgba(11,31,58,.16)!important;transform:translateY(-50%) scale(1.04)!important}
.showcase-media .work-nav:active{transform:translateY(-50%) scale(.96)!important}
.showcase-media .work-nav:focus-visible{outline:3px solid rgba(21,94,239,.4)!important;outline-offset:3px!important}
.showcase-media .work-nav-prev{left:12px!important}
.showcase-media .work-nav-next{right:12px!important}
.showcase-media .grb-picture img[data-work="professional"],
.showcase-media .grb-picture img[data-work="hospitality"],
.showcase-media .grb-picture img[data-work="local"]{transform:scale(1.12);transform-origin:center center}

.hero .lead span{font-weight:800!important;color:var(--navy)!important}
.footer-socials a{width:42px!important;height:42px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:50%!important;background:rgba(255,255,255,.04)!important;color:#fff!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:var(--lime)!important;background:rgba(183,240,0,.08)!important;color:#fff!important}
.footer-socials .grb-social-icon{width:20px;height:20px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:22px;height:22px}

@media(max-width:900px){
  .showcase-media{padding:0 52px!important;min-height:520px!important}
  .showcase-media .grb-picture img{max-height:520px!important}
  .showcase-media .work-nav{width:40px!important;height:52px!important;font-size:36px!important}
  .showcase-media .work-nav-prev{left:7px!important}
  .showcase-media .work-nav-next{right:7px!important}
  .showcase-media .grb-picture img[data-work="professional"],
  .showcase-media .grb-picture img[data-work="hospitality"],
  .showcase-media .grb-picture img[data-work="local"]{transform:scale(1.06)}
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
  .showcase-media{padding:0 40px!important;min-height:360px!important}
  .showcase-media .grb-picture img{max-height:360px!important}
  .showcase-media .work-nav{width:34px!important;height:46px!important;font-size:32px!important;border-radius:10px!important}
  .showcase-media .work-nav-prev{left:4px!important}
  .showcase-media .work-nav-next{right:4px!important}
  .showcase-media .grb-picture img[data-work="professional"],
  .showcase-media .grb-picture img[data-work="hospitality"],
  .showcase-media .grb-picture img[data-work="local"]{transform:scale(1.03)}
}
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
