/* ===== Inline script block 1 from original index.html ===== */
const body=document.body;
const modal=document.getElementById('modalBackdrop');
const modalPanel=modal.querySelector('.modal');
const modalClose=document.getElementById('modalClose');
let previousY=0, opener=null, modalNeed='';

function openModal(source){
  previousY=window.scrollY; opener=document.activeElement;
  modal.classList.add('show'); body.style.overflow='hidden';
  const modalFormEl=document.getElementById('modalForm');
  modalFormEl.classList.remove('hidden');
  document.getElementById('modalSuccess').classList.add('hidden');
  modalFormEl.querySelector('.submit-status')?.remove();
  setSubmitState(modalFormEl,'reset');
  refreshWaLinks();
  setTimeout(()=>document.getElementById('mName').focus(),30);
}
function closeModal(){
  modal.classList.remove('show'); body.style.overflow=''; window.scrollTo({top:previousY,behavior:'auto'});
  if(opener && typeof opener.focus==='function') setTimeout(()=>opener.focus(),0);
}
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));
modalClose.addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{
  if(!modal.classList.contains('show')) return;
  if(e.key==='Escape'){e.preventDefault();closeModal();return;}
  if(e.key==='Tab'){
    const focusables=[...modalPanel.querySelectorAll('button,input,textarea,[href]')].filter(x=>!x.disabled && x.offsetParent!==null);
    if(!focusables.length) return;
    const first=focusables[0],last=focusables[focusables.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  }
});

// FAQ state + accessible relationships.
document.querySelectorAll('.faq-q').forEach((q,i)=>{
  if(!q.id) q.id=`faq-q-${i+1}`;
  const a=q.nextElementSibling; if(a){a.id=a.id||`faq-a-${i+1}`; a.setAttribute('role','region'); a.setAttribute('aria-labelledby',q.id); q.setAttribute('aria-controls',a.id); q.setAttribute('aria-expanded','false');}
  q.addEventListener('click',()=>{
    const item=q.parentElement, open=item.classList.toggle('open');
    q.setAttribute('aria-expanded',String(open));
    q.querySelector('span').textContent=open?'−':'+';
  });
});

// Work gallery tabs + flanking navigation.
const workTabs=[...document.querySelectorAll('.tab')];
function setWorkSlide(index){
  if(!workTabs.length) return;
  const next=((index%workTabs.length)+workTabs.length)%workTabs.length;
  workTabs[next].click();
}
workTabs.forEach(t=>t.addEventListener('click',()=>{
  workTabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');

  const mockups={
    'Private Schools':'school',
    'Professional Services':'professional',
    'Hospitality':'hospitality',
    'Local Businesses':'local'
  };
  const key=mockups[t.textContent.trim()];
  document.querySelectorAll('.work-mockup').forEach(img=>{
    const active=img.dataset.work===key;
    img.classList.toggle('active',active);
    const picture=img.closest('.grb-picture');
    if(picture) picture.classList.toggle('active',active);
  });
  const copy=document.getElementById('workCopy');
  if(copy) copy.textContent=t.dataset.copy;
}));
document.querySelector('.showcase-arrow-prev')?.addEventListener('click',()=>{
  const active=Math.max(0,workTabs.findIndex(t=>t.classList.contains('active')));
  setWorkSlide(active-1);
});
document.querySelector('.showcase-arrow-next')?.addEventListener('click',()=>{
  const active=Math.max(0,workTabs.findIndex(t=>t.classList.contains('active')));
  setWorkSlide(active+1);
});

// Lightweight contextual WhatsApp links. Messages stay short and are built from the form state.
const WA_NUMBER='2347017285626';
function waUrl(message){return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;}
function buildWaMessage(context, formType){
  const need=selectedNeed(formType);
  const business=(document.getElementById(formType==='modal'?'mBusiness':'business')?.value||'').trim();
  const name=(document.getElementById(formType==='modal'?'mName':'name')?.value||'').trim();
  if(context==='hero') return 'Hi GoReallyBig, I\\'d like to get started with a website for my business.';
  if(context==='header') return 'Hi GoReallyBig, I\\'d like to talk about a website for my business.';
  if(context==='offer') return 'Hi GoReallyBig, I\\'d like to discuss the right website package for my business.';
  if(context==='promise') return 'Hi GoReallyBig, I\\'d like to discuss a website that can help my business get found, build trust and win more business.';
  if(context==='commercial') return 'Hi GoReallyBig, I\\'d like to talk about making sure my business is ready when people look me up online.';
  if(context==='approach') return 'Hi GoReallyBig, I\\'d like to talk about a website built around my business, customers and goals.';
  if(context==='process') return 'Hi GoReallyBig, I\\'d like to talk through getting my business from idea to online.';
  if(context==='work') return 'Hi GoReallyBig, I\\'d like to discuss what my business website could look like.';
  if(context==='faq') return 'Hi GoReallyBig, I have a few questions about getting a website for my business.';
  let msg='Hi GoReallyBig, I\\'d like to discuss my website needs.';
  if(need) msg+=` I\\'m looking for: ${need}.`;
  if(business) msg+=` Business: ${business}.`;
  if(name) msg+=` My name is ${name}.`;
  return msg;
}
function refreshWaLinks(){
  document.querySelectorAll('[data-wa-context]').forEach(a=>a.href=waUrl(buildWaMessage(a.dataset.waContext,'contact')));
  document.querySelectorAll('[data-wa-form]').forEach(a=>a.href=waUrl(buildWaMessage('form',a.dataset.waForm)));
  document.querySelectorAll('[data-wa-success]').forEach(a=>a.href=waUrl(buildWaMessage('form',a.dataset.waSuccess)));
}
function selectedNeed(formType){
  const form=document.getElementById(formType==='modal'?'modalForm':'contactForm');
  const el=form?.querySelector('input[name="need"]:checked');
  return el ? String(el.value||'').trim() : '';
}
function wireNeedRadios(formId, fieldId){
  const form=document.getElementById(formId);
  if(!form) return;
  const radios=[...form.querySelectorAll('input[name="need"]')];
  const siteField=document.getElementById(fieldId);
  const url=document.getElementById(formId==='modalForm'?'mSite':'site');
  const sync=()=>{
    const need=form.querySelector('input[name="need"]:checked')?.value||'';
    const makeover=need==='Website makeover';
    if(siteField){siteField.hidden=!makeover;siteField.setAttribute('aria-hidden',String(!makeover));}
    if(url){
      url.required=makeover;
      url.setAttribute('aria-required',String(makeover));
      if(!makeover){url.setCustomValidity('');url.removeAttribute('aria-invalid');}
      const label=url.closest('.field')?.querySelector('label');
      if(label) label.classList.toggle('required-field',makeover);
    }
    radios.forEach(r=>r.closest('.need-option')?.classList.toggle('selected',r.checked));
    refreshWaLinks();
  };
  radios.forEach(r=>r.addEventListener('change',sync));
  sync();
}
wireNeedRadios('modalForm','modalSiteField');
wireNeedRadios('contactForm','siteField');
document.querySelectorAll('#contactForm input,#contactForm textarea,#modalForm input,#modalForm textarea').forEach(el=>el.addEventListener('input',refreshWaLinks));


// Production form submission to the GoReallyBig Google Apps Script web app.
// The endpoint is public by design; no secret is stored in the frontend.
// The request uses a simple URL-encoded POST so the browser does not require a CORS preflight.
const LEAD_CAPTURE_URL='https://script.google.com/macros/s/AKfycbwisgNDtbntSx9usZlwnQoYZZDF37n_Y7rMdwMxtCWES6NcRqS5Yy9m71eGiOK8uFBS/exec';

function formPayload(formType){
  const modalForm=formType==='modal';
  const get=id=>document.getElementById(id);
  const name=(get(modalForm?'mName':'name')?.value||'').trim();
  const business=(get(modalForm?'mBusiness':'business')?.value||'').trim();
  const email=(get(modalForm?'mEmail':'email')?.value||'').trim();
  const phone=(get(modalForm?'mPhone':'phone')?.value||'').trim();
  const need=(document.getElementById(modalForm?'modalForm':'contactForm')?.querySelector('input[name="need"]:checked')?.value||'').trim();
  const site=(get(modalForm?'mSite':'site')?.value||'').trim();
  const message=(get(modalForm?'mContext':'message')?.value||'').trim();

  const data=new URLSearchParams();
  data.set('name',name);
  data.set('business',business);
  data.set('email',email);
  data.set('phone',phone);
  data.set('need',need);
  data.set('requestType',need);
  data.set('site',site);
  data.set('website',site);
  data.set('websiteUrl',site);
  data.set('message',message);
  data.set('source',modalForm?'modal':'contact');
  return data;
}

function setSubmitState(form,state){
  const button=form?.querySelector('button[type="submit"]');
  if(!button) return;

  if(state==='sending'){
    if(!button.dataset.originalText) button.dataset.originalText=button.textContent.trim();
    button.disabled=true;
    button.setAttribute('aria-busy','true');
    button.classList.add('is-submitting');
    button.innerHTML='<span class="submit-spinner" aria-hidden="true"></span><span>Sending...</span>';
  }else if(state==='success'){
    button.disabled=true;
    button.setAttribute('aria-busy','false');
    button.classList.remove('is-submitting');
    button.classList.add('is-submitted');
    button.innerHTML='<span aria-hidden="true">✓</span><span>Request sent</span>';
  }else if(state==='error'){
    button.disabled=false;
    button.setAttribute('aria-busy','false');
    button.classList.remove('is-submitting','is-submitted');
    button.innerHTML='<span>Try again</span>';
  }else{
    button.disabled=false;
    button.removeAttribute('aria-busy');
    button.classList.remove('is-submitting','is-submitted');
    button.textContent=button.dataset.originalText||"Let's GoReallyBig";
  }
}

async function submitLead(form,formType){
  setSubmitState(form,'sending');

  try{
    // no-cors responses are intentionally opaque. We only use completion/failure
    // of the browser request for UX feedback; the backend remains authoritative.
    const timeout=new Promise((_,reject)=>
      setTimeout(()=>reject(new Error('Submission timed out')),15000)
    );

    await Promise.race([
      fetch(LEAD_CAPTURE_URL,{
        method:'POST',
        mode:'no-cors',
        body:formPayload(formType),
        keepalive:true
      }),
      timeout
    ]);

    setSubmitState(form,'success');
    return true;
  }catch(err){
    console.error('GoReallyBig lead submission failed.',err);

    const note=form.querySelector('.form-note') ||
      form.querySelector('.form-actions');
    if(note){
      let status=form.querySelector('.submit-status');
      if(!status){
        status=document.createElement('div');
        status.className='submit-status';
        status.setAttribute('role','status');
        status.setAttribute('aria-live','polite');
        note.appendChild(status);
      }
      status.textContent='We’re taking longer than expected. Please try again if you did not receive a confirmation email.';
    }

    setSubmitState(form,'error');
    return false;
  }
}

document.getElementById('modalForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.checkValidity()){form.reportValidity();return;}
  const sent=await submitLead(form,'modal');
  if(!sent) return;
  form.classList.add('hidden');
  const modalSuccess=document.getElementById('modalSuccess');
  modalSuccess.querySelector('p').textContent=`Request type: ${selectedNeed('modal')}. Your request has been captured. We'll take it from here.`;
  modalSuccess.classList.remove('hidden');
  refreshWaLinks();
});

const contactForm=document.getElementById('contactForm');
contactForm.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!contactForm.checkValidity()){contactForm.reportValidity();return;}
  const sent=await submitLead(contactForm,'contact');
  if(!sent) return;
  let success=document.getElementById('contactSuccess');
  if(!success){
    success=document.createElement('div');
    success.id='contactSuccess';
    success.className='success';
    const strong=document.createElement('strong');
    strong.textContent='Thanks. We’ve got it.';
    const p=document.createElement('p');
    const wa=document.createElement('a');
    wa.className='wa-link';
    wa.href='https://wa.me/2347017285626';
    wa.target='_blank';
    wa.rel='noopener noreferrer';
    wa.dataset.waSuccess='contact';
    const dot=document.createElement('span');
    dot.className='wa-dot';
    dot.textContent='WA';
    wa.append(dot,document.createTextNode('Continue on WhatsApp'));
    success.append(strong,p,wa);
    contactForm.appendChild(success);
  }
  success.querySelector('p').textContent=`Request type: ${selectedNeed('contact')}. Your request has been captured. We'll take it from here.`;
  refreshWaLinks();
  success.scrollIntoView({block:'nearest'});
});

// Mobile menu.
const menu=document.querySelector('.menu'),panel=document.getElementById('mobilePanel');
menu.addEventListener('click',()=>{const open=panel.classList.toggle('show');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('show');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')}));

// Section-aware nav highlighting.
const navLinks=[...document.querySelectorAll('.links a')];
const targets=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+en.target.id))}}),{rootMargin:'-42% 0px -48% 0px',threshold:0});
targets.forEach(t=>io.observe(t));
navLinks.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-82,behavior:'auto'});history.replaceState(null,'',a.getAttribute('href'))}));

// Form validation: email is optional; phone and need are compulsory.
// A current website URL becomes compulsory only when Makeover is selected.
function validWebsiteUrl(value){
  const v=String(value||'').trim();
  return /^(https?:\/\/|www\.)[^\s]+$/i.test(v);
}

['contactForm','modalForm'].forEach(id=>{
  const form=document.getElementById(id);
  if(!form) return;
  form.addEventListener('submit',e=>{
    const url=form.id==='modalForm'?document.getElementById('mSite'):document.getElementById('site');
    const need=form.querySelector('input[name="need"]:checked');
    if(url && need && need?.value==='Website makeover' && !validWebsiteUrl(url.value)){
      e.preventDefault();
      url.setCustomValidity('Enter a valid website URL starting with https:// or www.');
      url.reportValidity();
      url.addEventListener('input',()=>url.setCustomValidity(''),{once:true});
    }else if(url){
      url.setCustomValidity('');
    }
  },true);
});


/* ===== Inline script block 2 from original index.html ===== */
/* Consistent required-field UX across browsers. */
function validateRequiredUX(form){
  if(!form) return true;
  const required=[...form.querySelectorAll('[required]')].filter(el=>!el.hidden && el.offsetParent!==null);
  const missing=required.filter(el=>!String(el.value||'').trim());
  form.querySelector('.required-error')?.remove();
  if(!missing.length) return true;

  const error=document.createElement('div');
  error.className='required-error';
  error.setAttribute('role','alert');
  error.style.cssText='margin:0 0 14px;padding:10px 12px;border-radius:10px;background:#FEF3F2;color:#B42318;font-size:13px;font-weight:600;';
  error.textContent='Please complete the required fields marked with *.';