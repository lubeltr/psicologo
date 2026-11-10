/* Retained interaction system: accessible mobile dialog, scroll reveals,
   header state and touch feedback. No external libraries or tracking. */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuDialog = document.querySelector('#site-menu');
const menuButton = document.querySelector('.menu-toggle');
const mobile = window.matchMedia('(max-width: 640px)');
const header = document.querySelector('.header');

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuDialog.close();
};

if (typeof menuDialog.showModal === 'function') {
  menuButton.addEventListener('click', () => {
    menuDialog.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
  });
  menuDialog.querySelector('.close-dialog').addEventListener('click', closeMenu);
  menuDialog.addEventListener('close', () => menuButton.setAttribute('aria-expanded', 'false'));
  menuDialog.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    closeMenu();
    // Wait for native dialog focus restoration before navigating to the section.
    event.preventDefault();
    requestAnimationFrame(() => {
      target.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth', block:'start'});
      history.replaceState(null, '', link.getAttribute('href'));
    });
  }));
  menuDialog.addEventListener('click', event => {
    if (event.target !== menuDialog) return;
    const r = menuDialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeMenu();
  });
  mobile.addEventListener('change', e => { if (!e.matches && menuDialog.open) closeMenu(); });
}

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), {threshold:.06, rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.add('reveal');
    const group = el.closest('[data-stagger]');
    if (group && !mobile.matches) el.style.setProperty('--reveal-delay', `${Array.from(group.children).indexOf(el) * 110}ms`);
    observer.observe(el);
  });
  reduced.addEventListener('change', e => {
    if (e.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
  });
}

document.querySelectorAll('.button').forEach(el => {
  let timer;
  el.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || reduced.matches) return;
    clearTimeout(timer);
    el.classList.add('touch-feedback');
    timer = setTimeout(() => el.classList.remove('touch-feedback'), 350);
  });
});
