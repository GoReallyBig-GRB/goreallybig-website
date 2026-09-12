document.addEventListener('submit',function(event){
  var form=event.target;
  if(!(form instanceof HTMLFormElement)) return;
  if(form.id!=='modalForm' && form.id!=='contactForm') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  var data=new URLSearchParams(new FormData(form));
  fetch('/api/submit-lead',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:data.toString(),credentials:'same-origin',cache:'no-store'})
    .then(function(response){return response.json().then(function(result){if(!response.ok||!result.ok) throw new Error(result.error||'Submission failed');return result;});})
    .then(function(){var button=form.querySelector('button[type="submit"]');if(button){button.disabled=true;button.textContent='Request sent';}})
    .catch(function(){var button=form.querySelector('button[type="submit"]');if(button){button.disabled=false;button.textContent='Try again';}});
},true);
