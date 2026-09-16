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
  .grb-wa-icon{
    width:28px;
    height:28px;
    display:block;
    flex:0 0 28px;
    order:2;
  }
  .grb-header-wa-icon{
    width:31px;
    height:31px;
    display:block;
  }
}
@media(min-width:901px){
  .grb-header-wa-icon{width:31px;height:31px;display:block}
}
.grb-wa-dot-icon{width:24px;height:24px;display:block;flex:0 0 24px}
.contact-detail a:hover,.footer-contact-link:hover strong{color:var(--lime)!important}
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
