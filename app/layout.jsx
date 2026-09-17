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

/* Contact actions: clear, touch-friendly links without changing the approved contact-card geometry. */
.contact-detail a{color:#aebacc;text-decoration:none;font-size:15px;line-height:1.65;display:inline-flex;align-items:center;gap:8px;min-height:28px}
.contact-detail a:hover{color:#fff;text-decoration:underline}
.contact-detail a:focus-visible{outline:2px solid var(--lime);outline-offset:4px;border-radius:4px}
.contact-detail .contact-whatsapp img{width:22px;height:22px;display:block;flex:0 0 22px}
.contact-detail .contact-whatsapp{font-weight:700}

/* Form WhatsApp CTA: visually distinct from text inputs and clearly interactive. */
.form .wa-link,.modal-fields .wa-link{display:inline-flex;align-items:center;justify-content:flex-start;gap:10px;width:auto;min-height:48px;padding:9px 16px;margin-top:14px;margin-bottom:28px;border:0;border-radius:999px;background:#25d366;color:#fff;text-decoration:none;cursor:pointer;box-shadow:0 6px 16px rgba(37,211,102,.18);transition:background .2s ease,color .2s ease,box-shadow .2s ease,transform .15s ease}
.form .wa-link:hover,.modal-fields .wa-link:hover{background:#128c7e;color:#fff;box-shadow:0 9px 22px rgba(18,140,126,.22);transform:translateY(-1px)}
.form .wa-link:active,.modal-fields .wa-link:active{transform:translateY(0) scale(.98);box-shadow:0 3px 10px rgba(18,140,126,.18)}
.form .wa-link:focus-visible,.modal-fields .wa-link:focus-visible{outline:3px solid rgba(21,94,239,.45);outline-offset:3px}
.form .wa-link .wa-dot,.modal-fields .wa-link .wa-dot{flex:0 0 28px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#fff}
.form .wa-link .wa-dot img,.modal-fields .wa-link .wa-dot img{width:20px;height:20px;display:block}
.form .wa-link-copy,.modal-fields .wa-link-copy{font-size:13px;line-height:1.25;font-weight:700;white-space:nowrap}
.form .wa-link-copy strong,.modal-fields .wa-link-copy strong{font-weight:800}
.form .wa-number,.modal-fields .wa-number{font-size:12px;line-height:1.2;font-weight:800;white-space:nowrap;color:#fff;text-decoration:underline;text-underline-offset:3px}
.form .wa-link:hover .wa-number,.modal-fields .wa-link:hover .wa-number{color:#d9fff0}

/* Our Work: arrows sit inside the showcase flank so the media container cannot clip them. */
.showcase-media{position:relative;padding:0 54px}
.showcase-media .work-mockup{display:none;width:100%;height:620px;max-height:none;object-fit:contain}
.showcase-media .work-mockup.active{display:block}
.showcase-media .work-nav{position:absolute;top:50%;z-index:10;width:44px;height:64px;display:grid;place-items:center;padding:0;border:1px solid rgba(11,31,58,.12);border-radius:12px;background:rgba(255,255,255,.96);color:var(--navy);font-size:42px;font-weight:500;line-height:1;cursor:pointer;box-shadow:0 10px 24px rgba(11,31,58,.12);transform:translateY(-50%);transition:transform .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease}
.showcase-media .work-nav:hover{background:#fff;border-color:rgba(21,94,239,.45);box-shadow:0 14px 28px rgba(11,31,58,.18);transform:translateY(-50%) scale(1.04)}
.showcase-media .work-nav:active{transform:translateY(-50%) scale(.96)}
.showcase-media .work-nav:focus-visible{outline:3px solid rgba(21,94,239,.4);outline-offset:3px}
.showcase-media .work-nav-prev{left:8px}
.showcase-media .work-nav-next{right:8px}

/* Give the three secondary mockups the same presentation scale as the approved Private Schools view. */
.showcase-media .work-mockup[data-work="professional"],
.showcase-media .work-mockup[data-work="hospitality"],
.showcase-media .work-mockup[data-work="local"]{transform:scale(1.12)}

.hero .lead span{font-weight:800!important;color:var(--navy)!important}
.footer-socials a{width:42px!important;height:42px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:50%!important;background:rgba(255,255,255,.04)!important;color:#fff!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:var(--lime)!important;background:rgba(183,240,0,.08)!important;color:#fff!important}
.footer-socials .grb-social-icon{width:20px;height:20px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:22px;height:22px}

@media(max-width:900px){
  .showcase-media{padding:0 42px}
  .showcase-media .work-mockup{height:520px}
  .showcase-media .work-nav{width:38px;height:54px;font-size:36px}
  .showcase-media .work-nav-prev{left:6px}
  .showcase-media .work-nav-next{right:6px}
  .showcase-media .work-mockup[data-work="professional"],
  .showcase-media .work-mockup[data-work="hospitality"],
  .showcase-media .work-mockup[data-work="local"]{transform:scale(1.06)}
}

@media(max-width:560px){
  .form .wa-link,.modal-fields .wa-link{min-height:52px;padding:9px 13px;margin-top:14px;margin-bottom:24px}
  .form .wa-link-copy,.modal-fields .wa-link-copy{font-size:12px}
  .form .wa-number,.modal-fields .wa-number{font-size:11px;padding-top:2px}
  .showcase-media{padding:0 32px}
  .showcase-media .work-mockup{height:360px}
  .showcase-media .work-nav{width:34px;height:48px;font-size:32px;border-radius:10px}
  .showcase-media .work-nav-prev{left:5px}
  .showcase-media .work-nav-next{right:5px}
  .showcase-media .work-mockup[data-work="professional"],
  .showcase-media .work-mockup[data-work="hospitality"],
  .showcase-media .work-mockup[data-work="local"]{transform:scale(1.03)}
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
