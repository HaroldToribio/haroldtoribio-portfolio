/* main.js — Portafolio Harold Toribio
   - responsive menu
   - reveal (IntersectionObserver)
   - typing effect
   - smooth scroll
   - navbar scroll style
   - lightweight form validation (front-end)
*/

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- MENU RESPONSIVE ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });
  }

  /* ---------- NAVBAR SCROLL EFFECT ---------- */
  const header = document.querySelector("header");
  function navbarObserver() {
    if (!header) return;
    if (window.scrollY > 50) header.classList.add("scroll-active");
    else header.classList.remove("scroll-active");
  }
  window.addEventListener("scroll", navbarObserver);
  navbarObserver();

  /* ---------- REVEAL ON SCROLL (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- TYPING EFFECT ---------- */
  const typingEl = document.querySelector(".typing-text");
  if (typingEl) {
    const texts = ["Desarrollador Full Stack", "Especialista en Python & JavaScript", "Apasionado por el Desarrollo Web"];
    let ti = 0, ci = 0, deleting = false;
    function tick() {
      const full = texts[ti];
      if (!deleting) {
        ci++;
        typingEl.textContent = full.substring(0, ci);
        if (ci === full.length) {
          deleting = true;
          setTimeout(tick, 900);
          return;
        }
      } else {
        ci--;
        typingEl.textContent = full.substring(0, ci);
        if (ci === 0) {
          deleting = false;
          ti = (ti + 1) % texts.length;
        }
      }
      setTimeout(tick, deleting ? 60 : 110);
    }
    tick();
  }

  /* ---------- SMOOTH SCROLL (fallback) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
          // close mobile menu after click
          if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  /* ---------- FORM VALIDATION (lightweight) ---------- */
  // Handles any form that uses FormSubmit.co (we still let the browser submit after validation)
  const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      // basic front-end validation (name >=3, email basic format, message >=10)
      const name = form.querySelector('input[name="name"], input#name');
      const email = form.querySelector('input[name="email"], input#email');
      const message = form.querySelector('textarea[name="message"], textarea#message');

      function validEmail(val) {
        return /\S+@\S+\.\S+/.test(val);
      }

      if (name && name.value.trim().length < 3) {
        e.preventDefault();
        alert("El nombre debe tener al menos 3 caracteres.");
        name.focus();
        return;
      }

      if (email && !validEmail(email.value.trim())) {
        e.preventDefault();
        alert("Introduce un correo válido.");
        email.focus();
        return;
      }

      if (message && message.value.trim().length < 10) {
        e.preventDefault();
        alert("El mensaje debe tener al menos 10 caracteres.");
        message.focus();
        return;
      }

      // If passes validation, allow submit (FormSubmit will handle _next redirect)
    });
  });

});
