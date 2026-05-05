/* ── NAV scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // also trigger stat line
      if (e.target.classList.contains('stat-item')) {
        animateStat(e.target.querySelector('.stat-number'));
      }
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

/* ── Stat counter ── */
function animateStat(el) {
  if (!el || el.dataset.animated) return;
  el.dataset.animated = true;
  const target = +el.dataset.target;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(ease * target);
    el.textContent = prefix + (target >= 1000 ? val.toLocaleString('pt-BR') : val) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + (target >= 1000 ? target.toLocaleString('pt-BR') : target) + suffix;
  }
  requestAnimationFrame(step);
}

/* ── Stat observer (extra trigger for stat items) ── */
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      animateStat(e.target.querySelector('.stat-number'));
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-item').forEach(el => statObs.observe(el));