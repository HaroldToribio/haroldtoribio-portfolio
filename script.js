/* ════════════════════════════════════════════════
   HAROLD TORIBIO · PORTFOLIO v3 · script.js
   ════════════════════════════════════════════════ */

document.body.classList.add('loading');

/* ── LOADER ────────────────────────────────────── */
(function loader() {
  const fill = document.getElementById('loaderFill');
  const pct  = document.getElementById('loaderPct');
  const el   = document.getElementById('loader');
  let p = 0;
  const tick = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(tick); finish(); }
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 130);

  function finish() {
    setTimeout(() => {
      el.classList.add('done');
      document.body.classList.remove('loading');
    }, 350);
  }
})();

/* ── CUSTOM CURSOR ─────────────────────────────── */
(function cursor() {
  const cur = document.getElementById('cur');
  if (!cur) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  const grow = 'a, button, input, textarea, .proj-card, .bento-card, .contact-item';
  document.querySelectorAll(grow).forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('grow'));
    el.addEventListener('mouseleave', () => cur.classList.remove('grow'));
  });
})();

/* ── NAV SHRINK ────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('shrink', window.scrollY > 50);
}, { passive: true });

/* ── MOBILE MENU ───────────────────────────────── */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => {
    burger.classList.remove('open');
    mobMenu.classList.remove('open');
  })
);

/* ── LANGUAGE TOGGLE ───────────────────────────── */
(function lang() {
  const btn = document.getElementById('langToggle');
  let isEN = false; // default Spanish
  btn.addEventListener('click', () => {
    isEN = !isEN;
    document.querySelectorAll('[data-en]').forEach(el => {
      const txt = isEN ? el.getAttribute('data-en') : el.getAttribute('data-es');
      if (txt !== null) el.textContent = txt;
    });
    document.querySelectorAll('[data-ph-en]').forEach(el => {
      el.placeholder = isEN ? el.getAttribute('data-ph-en') : el.getAttribute('data-ph-es');
    });
    btn.textContent = isEN ? 'ES' : 'EN';
    document.documentElement.lang = isEN ? 'en' : 'es';
  });
})();

/* ── CINEMATIC SCROLL REVEAL ───────────────────── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.cin-rise').forEach(el => revObs.observe(el));

/* ── SMOOTH ANCHOR SCROLL ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const t = document.querySelector(id);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── CONTACT FORM ──────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const txt  = form.querySelector('.c-submit-text');
    const name = form.querySelector('input[type="text"]').value;
    const mail = form.querySelector('input[type="email"]').value;
    const msg  = form.querySelector('textarea').value;
    const original = txt.textContent;

    txt.textContent = '✓ Enviado';
    const href = `mailto:htoribio88@gmail.com?subject=${encodeURIComponent('Contacto — ' + name)}&body=${encodeURIComponent(msg + '\n\n' + name + ' · ' + mail)}`;
    window.location.href = href;

    setTimeout(() => {
      txt.textContent = original;
      form.reset();
    }, 3000);
  });
}

/* ── ACTIVE NAV ────────────────────────────────── */
const secs = document.querySelectorAll('section[id]');
const nls  = document.querySelectorAll('.nav-links a');
const actObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      nls.forEach(l => l.style.color =
        l.getAttribute('href') === '#' + e.target.id ? 'var(--cream)' : '');
    }
  });
}, { threshold: 0.5 });
secs.forEach(s => actObs.observe(s));

/* ── HERO PARALLAX (subtle) ────────────────────── */
const photo = document.querySelector('.hero-photo-frame');
if (photo && window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      photo.style.transform = `translateY(${y * 0.06}px)`;
    }
  }, { passive: true });
}