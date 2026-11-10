
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const fine = window.matchMedia('(pointer: fine)');
const hero = document.querySelector('.hero');
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll('.approach > div,.section-heading,.consultation > div,.faq > div,.contact-inner,.office-photo').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  document.querySelectorAll('.cards,.review-grid,.steps').forEach(group=>{
    Array.from(group.children).forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${i*100}ms`);observer.observe(el);});
  });
}
window.addEventListener('scroll',()=>document.querySelector('.header').classList.toggle('is-scrolled',window.scrollY>15),{passive:true});
const menuDialog = document.querySelector('#site-menu');
const menuButton = document.querySelector('.menu-toggle');
if (typeof menuDialog.showModal === 'function') {
  menuButton.setAttribute('aria-expanded','false');
  menuButton.addEventListener('click',()=>{menuDialog.showModal();menuButton.setAttribute('aria-expanded','true');});
  menuDialog.querySelector('.close-dialog').addEventListener('click',()=>menuDialog.close());
  menuDialog.addEventListener('close',()=>menuButton.setAttribute('aria-expanded','false'));
  menuDialog.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menuDialog.close()));
  menuDialog.addEventListener('click',event=>{if(event.target===menuDialog){const r=menuDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)menuDialog.close();}});
}


window.matchMedia('(max-width: 640px)').addEventListener('change', e=>{if(!e.matches && menuDialog.open)menuDialog.close();});
