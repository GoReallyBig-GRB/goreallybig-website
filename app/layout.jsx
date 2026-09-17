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

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function getProductionStyles() {
  const source = read('index.html');
  const inline = [...source.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1]).join('\n');

  // These external stylesheets are part of the production cascade and contain
  // the final responsive/hero refinements that must be present on first paint.
  const productionCss = [
    read('assets/body-copy.css'),
    read('assets/hero-composition.css'),
    read('assets/hero-composition-v2.css')
      .replaceAll("url('whatsapp-icon-outline.svg')", "url('/assets/whatsapp-icon-outline.svg')"),
  ].join('\n');

  // app.js used to inject these rules at runtime. They are presentation rules,
  // so they belong in the initial CSS now that the page is statically rendered.
  const runtimePresentation = `
@media(max-width:900px){
  .menu.grb-mobile-runtime[aria-expanded="true"]{font-size:30px!important}
  .menu.grb-mobile-runtime::before{content:none!important;display:none!important}
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
.contact-detail a{color:#aebacc;text-decoration:none;font-size:15px;line-height:1.65}
.contact-detail a:hover{color:#fff;text-decoration:underline}
.hero .lead span{font-weight:800!important;color:var(--navy)!important}
.footer-socials a{width:42px!important;height:42px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:50%!important;background:rgba(255,255,255,.04)!important;color:#fff!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:var(--lime)!important;background:rgba(183,240,0,.08)!important;color:#fff!important}
.footer-socials .grb-social-icon{width:20px;height:20px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:22px;height:22px}
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
