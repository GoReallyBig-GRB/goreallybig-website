/* Runtime bootstrap for the production mobile-navigation refinement. */
(function(){
  const heroStyles=document.createElement('link');
  heroStyles.rel='stylesheet';
  heroStyles.href='assets/hero-composition-v2.css?v=20260915-3';
  document.head.appendChild(heroStyles);

  const core=document.createElement('script');
  core.src='assets/app-core.js';
  core.onload=function(){
    const menu=document.querySelector('.menu');
    const panel=document.getElementById('mobilePanel');
    const WA_NUMBER='2347017285626';
    const DISPLAY_NUMBER='+234 701 728 5626';
    const WA_URL='https://wa.me/'+WA_NUMBER;
    const MOBILE_WA_MESSAGE='Hi GoReallyBig, I\'d like to talk about a website for my business.';
    const MOBILE_WA_URL=WA_URL+'?text='+encodeURIComponent(MOBILE_WA_MESSAGE);

    const makeWaIcon=function(className){
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 32 32');
      svg.setAttribute('aria-hidden','true');
      svg.setAttribute('focusable','false');
      if(className) svg.setAttribute('class',className);
      const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
      circle.setAttribute('cx','16'); circle.setAttribute('cy','16'); circle.setAttribute('r','15'); circle.setAttribute('fill','#fff'); circle.setAttribute('stroke','#25D366'); circle.setAttribute('stroke-width','2');
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('fill','#25D366');
      path.setAttribute('d','M23.6 8.4A10.8 10.8 0 0 0 7 21.4L5.8 26l4.7-1.2A10.8 10.8 0 0 0 23.6 8.4Zm-7.7 15.1a9 9 0 0 1-4.5-1.2l-.3-.2-2.8.7.7-2.7-.2-.3a9 9 0 1 1 7.1 3.7Zm4.9-6.7c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.3-.6-.5Z');
      svg.append(circle,path);
      return svg;
    };

    const makeSocialIcon=function(name){
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24');
      svg.setAttribute('aria-hidden','true');
      svg.setAttribute('focusable','false');
      svg.classList.add('grb-social-icon');
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('fill','currentColor');
      if(name==='Facebook'){
        path.setAttribute('d','M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7.2v3H10v8h3.5Z');
      }else if(name==='Instagram'){
        path.setAttribute('fill','none'); path.setAttribute('stroke','currentColor'); path.setAttribute('stroke-width','2');
        path.setAttribute('d','M7.2 3.5h9.6a3.7 3.7 0 0 1 3.7 3.7v9.6a3.7 3.7 0 0 1-3.7 3.7H7.2a3.7 3.7 0 0 1-3.7-3.7V7.2a3.7 3.7 0 0 1 3.7-3.7Z');
        const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttribute('cx','12'); circle.setAttribute('cy','12'); circle.setAttribute('r','4.1'); circle.setAttribute('fill','none'); circle.setAttribute('stroke','currentColor'); circle.setAttribute('stroke-width','2');
        const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
        dot.setAttribute('cx','17.4'); dot.setAttribute('cy','6.7'); dot.setAttribute('r','1.1'); dot.setAttribute('fill','currentColor');
        svg.append(path,circle,dot); return svg;
      }else if(name==='TikTok'){
        path.setAttribute('d','M15.1 3h3.1c.3 1.8 1.3 3.2 3 4v3.2c-1.2-.1-2.3-.5-3.3-1.1v6.1c0 3.9-2.7 6.8-6.5 6.8-3.1 0-5.5-2.3-5.5-5.3 0-3.4 2.8-5.8 6.2-5.5v3.3c-1.6-.2-2.9.7-2.9 2.2 0 1.1.9 2 2.1 2 1.4 0 2.8-1 2.8-3.2V3h1Z');
      }else if(name==='X'){
        path.setAttribute('d','M4.2 3.5h4.2l4.1 5.6 4.9-5.6h2.4l-6.2 7.1 6.6 9.9H16l-4.6-6.7-5.9 6.7H3.1l7.2-8.2-6.1-8.8Zm3.1 2 9.2 13h1.7l-9.2-13H7.3Z');
      }
      svg.appendChild(path);
      return svg;
    };

    const replaceWaBadge=function(element,className){
      if(!element) return;
      element.textContent='';
      element.appendChild(makeWaIcon(className));
    };

    const headerWa=document.querySelector('.contact-mini[data-wa-context="header"]');
    if(headerWa){
      const number=headerWa.querySelector('span:last-child');
      if(number){
        number.textContent=DISPLAY_NUMBER;
        number.style.fontSize='13px';
        number.style.letterSpacing='-.01em';
      }
      headerWa.setAttribute('aria-label','Chat on WhatsApp at '+DISPLAY_NUMBER);
      headerWa.style.fontSize='13px';
      headerWa.style.gap='7px';
      replaceWaBadge(headerWa.querySelector('.wa'),'grb-header-wa-icon');
    }

    document.querySelectorAll('.links a[data-nav="faq"], .links a[href="#faq"]').forEach(function(link){
      link.remove();
    });

    document.querySelectorAll('.contact-detail').forEach(function(detail){
      const label=detail.querySelector('b');
      const value=detail.querySelector('span');
      if(label && value && label.textContent.trim()==='WhatsApp'){
        const link=document.createElement('a');
        link.href=WA_URL;
        link.target='_blank';
        link.rel='noopener noreferrer';
        link.textContent=DISPLAY_NUMBER;
        link.style.display='inline-block';
        link.style.color='inherit';
        link.style.fontWeight='700';
        link.style.textDecoration='none';
        link.setAttribute('aria-label','Chat on WhatsApp at '+DISPLAY_NUMBER);
        value.replaceWith(link);
      }
    });

    document.querySelectorAll('.footer-contact-link').forEach(function(link){
      const label=link.querySelector('span');
      const number=link.querySelector('strong');
      if(label && number && label.textContent.trim()==='WhatsApp'){
        link.href=WA_URL;
        link.target='_blank';
        link.rel='noopener noreferrer';
        number.textContent=DISPLAY_NUMBER;
      }
    });

    document.querySelectorAll('.wa-dot').forEach(function(dot){
      replaceWaBadge(dot,'grb-wa-dot-icon');
    });

    /* Footer social links: replace text placeholders with recognizable platform marks and optimize the tap targets. */
    document.querySelectorAll('.footer-socials a[aria-label]').forEach(function(link){
      const name=link.getAttribute('aria-label');
      if(['Facebook','Instagram','TikTok','X'].indexOf(name)!==-1){
        link.textContent='';
        link.appendChild(makeSocialIcon(name));
        link.setAttribute('title',name);
      }
    });

    if(menu && panel){
      const style=document.createElement('style');
      style.textContent=`
@media(max-width:900px){
  .menu.grb-mobile-runtime[aria-expanded="true"]{font-size:30px!important}
  .menu.grb-mobile-runtime::before{content:none!important;display:none!important}
  .mobile-panel>a.grb-mobile-wa{
    display:flex!important;
    flex-direction:row!important;
    align-items:center!important;
    justify-content:flex-start!important;
    gap:9px!important;
    font-size:16px!important;
    color:var(--navy)!important;
    padding-top:16px!important;
    padding-bottom:16px!important;
  }
  .mobile-panel>a.grb-mobile-wa::before,
  .mobile-panel>a.grb-mobile-wa::after{
    content:none!important;
    display:none!important;
  }
  .grb-wa-icon{width:28px;height:28px;display:block;flex:0 0 28px;order:2}
  .grb-header-wa-icon{width:31px;height:31px;display:block}
}
@media(min-width:901px){.grb-header-wa-icon{width:31px;height:31px;display:block}}
.grb-wa-dot-icon{width:24px;height:24px;display:block;flex:0 0 24px}
.footer-socials a{width:42px!important;height:42px!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:50%!important;background:rgba(255,255,255,.04)!important;color:#fff!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}
.footer-socials a:hover{transform:translateY(-2px)!important;border-color:var(--lime)!important;background:rgba(183,240,0,.08)!important;color:#fff!important}
.footer-socials .grb-social-icon{width:20px;height:20px;display:block}
.footer-socials a[aria-label="Facebook"] .grb-social-icon{width:22px;height:22px}
.contact-detail a:hover,.footer-contact-link:hover strong{color:var(--lime)!important}
h1{font-size:clamp(52px,6.8vw,96px)!important}
`;
      document.head.appendChild(style);

      menu.classList.add('grb-mobile-runtime');
      const wa=panel.querySelector('a[href^="https://wa.me/"]');
      if(wa){
        wa.classList.add('grb-mobile-wa');
        wa.textContent='';
        const label=document.createElement('span');
        label.textContent=DISPLAY_NUMBER;
        wa.appendChild(label);
        wa.appendChild(makeWaIcon('grb-wa-icon'));
        wa.href=MOBILE_WA_URL;
        wa.setAttribute('aria-label','Chat on WhatsApp at '+DISPLAY_NUMBER+' with a prefilled message');
      }

      const sync=function(){
        const open=menu.getAttribute('aria-expanded')==='true';
        menu.textContent=open?'×':'☰';
      };
      menu.addEventListener('click',sync);
      panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setTimeout(sync,0)});});
      sync();
    }
  };
  document.head.appendChild(core);
})();
