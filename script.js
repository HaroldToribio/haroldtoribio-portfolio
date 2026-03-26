/* ============================================
   HAROLD TORIBIO · PORTFOLIO JS
   ============================================ */

// ── CUSTOM CURSOR ──────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverables = document.querySelectorAll('a, button, .project-card, .stack-group, .contact-link, input, textarea');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});


// ── NAV SCROLL ─────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


// ── MOBILE MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open');
  mobileMenu.classList.toggle('is-open');
});

document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
  });
});


// ── REVEAL ON SCROLL ───────────────────────
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.is-visible)'));
      const i = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => observer.observe(el));


// ── TILT EFFECT ON CARDS ───────────────────
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
  });
});


// ── SMOOTH SCROLL FOR NAV LINKS ────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── CONTACT FORM ───────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const name = document.getElementById('name').value;

    btn.textContent = '✓ Mensaje enviado';
    btn.style.background = 'rgba(0, 229, 160, 0.2)';
    btn.style.color = 'var(--accent)';
    btn.style.border = '1px solid var(--accent-mid)';

    setTimeout(() => {
      btn.innerHTML = 'Enviar mensaje <span>→</span>';
      btn.style = '';
      form.reset();
    }, 3000);

    // Build mailto link as fallback
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mailtoHref = `mailto:htoribio88@gmail.com?subject=Contacto desde portafolio - ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nDe: ' + name + ' <' + email + '>')}`;
    window.location.href = mailtoHref;
  });
}


// ── ACTIVE NAV LINK ON SCROLL ──────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));


// ── STAGGER HERO ANIMATIONS ────────────────
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 200 + i * 150);
  });
});