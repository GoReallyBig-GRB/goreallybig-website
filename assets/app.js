/* Runtime bootstrap for the production mobile-navigation refinement.
   The original application is preserved in assets/app-core.js. */
(function(){
  const applyHeroAccent=function(){
    document.querySelectorAll('.hero .lead span').forEach(function(el){
      el.style.setProperty('color','var(--lime)','important');
      el.style.setProperty('font-weight','700','important');
    });
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHeroAccent,{once:true});
  }else{
    applyHeroAccent();
  }

  const core=document.createElement('script');
  core.src='assets/app-core.js';
  core.onload=function(){
    const menu=document.querySelector('.menu');
    const panel=document.getElementById('mobilePanel');
    if(!menu||!panel) return;

    const style=document.createElement('style');
    style.textContent=`
@media(max-width:900px){
  .menu.grb-mobile-runtime[aria-expanded="true"]{font-size:30px!important}
  .menu.grb-mobile-runtime::before{content:none!important;display:none!important}
  .mobile-panel>a.grb-mobile-wa{
    display:flex!important;
    align-items:center;
    gap:10px;
    font-size:16px!important;
    color:var(--navy)!important;
  }
  .mobile-panel>a.grb-mobile-wa::before,
  .mobile-panel>a.grb-mobile-wa::after{
    content:none!important;
    display:none!important;
  }
  .grb-wa-icon{
    width:24px;
    height:24px;
    flex:0 0 24px;
    display:block;
  }
}`;
    document.head.appendChild(style);

    menu.classList.add('grb-mobile-runtime');
    const wa=panel.querySelector('a[href^="https://wa.me/"]');
    if(wa){
      wa.classList.add('grb-mobile-wa');
      wa.textContent='';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','grb-wa-icon');
      svg.setAttribute('viewBox','0 0 24 24');
      svg.setAttribute('aria-hidden','true');
      const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
      circle.setAttribute('cx','12'); circle.setAttribute('cy','12'); circle.setAttribute('r','12'); circle.setAttribute('fill','#25D366');
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('fill','#fff');
      path.setAttribute('d','M17.5 6.5A7.75 7.75 0 0 0 5.27 15.84L4.5 19.5l3.74-.98A7.75 7.75 0 0 0 17.5 6.5Zm-5.48 11.02a6.42 6.42 0 0 1-3.27-.9l-.23-.14-2.22.58.59-2.16-.15-.23a6.43 6.43 0 1 1 5.28 2.85Zm3.52-4.83c-.19-.1-1.12-.55-1.29-.61-.17-.06-.3-.1-.43.1-.13.19-.49.61-.6.73-.11.13-.22.14-.41.05-.19-.1-.79-.29-1.51-.92-.56-.5-.93-1.11-1.04-1.3-.11-.19-.01-.29.08-.39.08-.08.19-.22.29-.33.1-.11.13-.19.19-.32.06-.13.03-.24-.02-.34-.05-.1-.43-1.03-.59-1.41-.16-.37-.31-.32-.43-.33h-.37c-.13 0-.34.05-.52.24-.18.19-.68.66-.68 1.61s.7 1.87.79 2c.1.13 1.37 2.09 3.32 2.93.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.12-.46 1.28-.9.16-.44.16-.82.11-.9-.05-.08-.17-.13-.36-.23Z');
      svg.append(circle,path);
      const label=document.createElement('span');
      label.textContent='0701 728 5626';
      wa.append(svg,label);
    }

    const sync=function(){
      const open=menu.getAttribute('aria-expanded')==='true';
      menu.textContent=open?'×':'☰';
    };
    menu.addEventListener('click',sync);
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setTimeout(sync,0)));
    sync();
  };
  document.head.appendChild(core);
})();
