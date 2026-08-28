(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (document.body.dataset.supportEnabled === 'true' && params.get('payment') === 'thanks') {
    const bar = document.createElement('div');
    bar.className = 'payment-thanks';
    bar.textContent = 'Dziękujemy za wsparcie LOOP.';
    document.body.prepend(bar);
  }
})();
