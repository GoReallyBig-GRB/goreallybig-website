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
.form .wa-link,.modal-fields 
.form .wa-link:hover,.modal-fields 
.form .wa-link:focus-visible,.modal-fields 
.form .wa-form-icon,.modal-fields .wa-form-icon{width:18px!important;height:18px!important;min-width:18px!important;max-width:18px!important;min-height:18px!important;max-height:18px!important;flex:0 0 18px!important;display:block!important;object-fit:contain!important}
.form .wa-link-copy,.modal-fields 
.form .wa-link-copy strong,.modal-fields 
.form-continue,.modal-fields .form-continue{margin:0 0 7px!important;color:var(--navy)!important;font-size:12px!important;font-weight:800!important}
.form .form-required-note,.modal-fields .form-required-note{margin:0 0 12px!important;color:#667085!important;font-size:11px!important;line-height:1.45!important}
.form .form-actions{margin-top:14px!important}
.form .form-actions .cta,.modal-fields>.cta{width:100%!important;min-height:50px!important;border-radius:12px!important;box-shadow:none!important;font-weight:800!important}
.contact .form{padding:22px!important;border-radius:22px!important}
.contact .form .fields{gap:12px!important}
.contact .form .field label{margin-bottom:5px!important}.contact .form .fields{gap:11px!important}.contact .form .field label{font-size:12px!important;line-height:1.25!important}.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:10px 12px!important}.contact .form .field textarea{min-height:82px!important}
.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:11px 13px!important}
.contact .form .field textarea{min-height:100px!important}
@media(max-width:900px){.contact .form{padding:20px!important;border-radius:20px!important}}
@media(max-width:560px){.contact .form{padding:17px!important;border-radius:18px!important}.contact .form .contact .form .contact .form .fields{gap:10px!important}.contact .form .field input,.contact .form .field textarea,.contact .form .field select{padding:10px 12px!important}.contact .form .field textarea{min-height:90px!important}}
/* FORM — native need selection, styled as compact accessible choices. */
.form .need-fieldset,.modal-fields .need-fieldset{border:0;padding:0;margin:0;min-width:0}
.form .need-fieldset legend,.modal-fields .need-fieldset legend{display:block;padding:0;margin:0 0 5px;font-weight:800;font-size:12px;line-height:1.25;color:var(--navy)}
.form .need,.modal-fields .need{display:flex!important;gap:6px!important;flex-wrap:wrap!important}
.form .need-option,.modal-fields .need-option{position:relative;display:inline-flex;align-items:center;margin:0;cursor:pointer}
.form .need-option input,.modal-fields .need-option input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
.form .need-option span,.modal-fields .need-option span{display:block;border:1px solid #ccd6e3;background:#fff;color:var(--navy);padding:9px 11px;border-radius:9px;font-size:12px;line-height:1.2;font-weight:600;transition:border-color .15s ease,background .15s ease,color .15s ease,box-shadow .15s ease}
.form .need-option input:checked + span,.modal-fields .need-option input:checked + span{background:var(--blue);border-color:var(--blue);color:#fff}
.form .need-option input:focus-visible + span,.modal-fields .need-option input:focus-visible + span{outline:2px solid var(--blue);outline-offset:2px}
.form .need-option:hover span,.modal-fields .need-option:hover span{border-color:var(--blue)}
.form .need-option.selected span,.modal-fields .need-option.selected span{background:var(--blue);border-color:var(--blue);color:#fff}
<style>
/* FORMS — authoritative compact layout. */
.contact .form .wa-link,.modal-fields 
.contact .form .wa-form-icon,.modal-fields .wa-form-icon{
  display:block!important;
  width:18px!important;height:18px!important;
  min-width:18px!important;max-width:18px!important;
  min-height:18px!important;max-height:18px!important;
  flex:0 0 18px!important;
  object-fit:contain!important;
}
.contact .form .wa-link-copy,.modal-fields 
.contact .form .form-continue,.modal-fields .form-continue{
  margin:0 0 7px!important;
}
.contact .form .form-required-note,.modal-fields .form-required-note{
  margin:0 0 12px!important;
}
.contact .form .fields,.modal-fields{
  gap:10px!important;
}
.contact .form .fields > .field:not(.full){
  display:grid!important;
  grid-template-columns:125px minmax(0,1fr)!important;
  align-items:center!important;
  column-gap:12px!important;
}
.contact .form .fields > .field:not(.full) label{
  margin:0!important;
  font-size:12px!important;
  line-height:1.25!important;
}
.contact .form .fields > .field:not(.full) input{
  width:100%!important;
  min-width:0!important;
  padding:9px 11px!important;
}
.modal-fields > .field:not(.full){
  display:grid!important;
  grid-template-columns:125px minmax(0,1fr)!important;
  align-items:center!important;
  column-gap:12px!important;
}
.modal-fields > .field:not(.full) label{
  margin:0!important;
  font-size:12px!important;
  line-height:1.25!important;
}
.modal-fields > .field:not(.full) input{
  width:100%!important;
  min-width:0!important;
  padding:9px 11px!important;
}
.contact .form .need-fieldset,.modal-fields .need-fieldset{
  border:0!important;padding:0!important;margin:0!important;min-width:0!important;
}
.contact .form .need-fieldset legend,.modal-fields .need-fieldset legend{
  padding:0!important;margin:0 0 5px!important;
  font-size:12px!important;line-height:1.25!important;font-weight:800!important;
}
.contact .form .need,.modal-fields .need{
  display:flex!important;gap:6px!important;flex-wrap:wrap!important;
}
.contact .form .need-option,.modal-fields .need-option{position:relative;display:inline-flex!important;align-items:center!important;margin:0!important;cursor:pointer!important}
.contact .form .need-option input,.modal-fields .need-option input{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;margin:0!important}
.contact .form .need-option span,.modal-fields .need-option span{display:block!important;border:1px solid #ccd6e3!important;background:#fff!important;color:var(--navy)!important;padding:8px 10px!important;border-radius:9px!important;font-size:12px!important;line-height:1.2!important;font-weight:600!important}
.contact .form .need-option input:checked+span,.modal-fields .need-option input:checked+span{background:var(--blue)!important;border-color:var(--blue)!important;color:#fff!important}
.contact .form .need-option input:focus-visible+span,.modal-fields .need-option input:focus-visible+span{outline:2px solid var(--blue)!important;outline-offset:2px!important}
.contact .form .field.full textarea{min-height:72px!important;padding:9px 11px!important}
.contact .form .form-actions{margin-top:12px!important}
.modal-fields .cta{margin-top:12px!important}
@media(max-width:600px){
  .contact .form .fields > .field:not(.full),.modal-fields > .field:not(.full){grid-template-columns:112px minmax(0,1fr)!important;column-gap:9px!important}
}
@media(max-width:480px){
  .contact .form .fields > .field:not(.full),.modal-fields > .field:not(.full){grid-template-columns:1fr!important;row-gap:3px!important}
  .contact .form .fields > .field:not(.full) label,.modal-fields > .field:not(.full) label{margin-bottom:2px!important}
  .contact .form .wa-link-copy,.modal-fields 
}
</style>
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

