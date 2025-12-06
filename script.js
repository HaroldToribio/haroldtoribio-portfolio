/* ============================================
   SCRIPT.JS - FUNCIONALIDAD COMPLETA
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. ACTUALIZACIÓN AUTOMÁTICA DEL AÑO (Footer)
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. MENÚ HAMBURGUESA
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Accesibilidad: cambiar aria-expanded
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // 3. CERRAR MENÚ AL HACER CLICK EN UN ENLACE
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 4. SCROLL SUAVE (Compatibilidad extra)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Evitar error si el href es solo "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Offset para el header sticky (ajustar si el header cambia de altura)
        const headerOffset = 80; 
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. EFECTO DE SOMBRA EN NAVBAR AL SCROLLEAR
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
      header.style.padding = '0.5rem 0'; // Efecto de encogimiento sutil
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.padding = 'var(--spacing-sm) 0'; // Volver al tamaño original
    }
    // Transición suave para el padding añadida vía JS o asegurar que esté en CSS
    header.style.transition = 'all 0.3s ease'; 
  });

  // 6. ANIMACIÓN AL HACER SCROLL (Scroll Reveal)
  // Esto hace que los elementos aparezcan suavemente cuando entran en pantalla
  const observerOptions = {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  // Seleccionamos qué elementos queremos animar
  const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-wrapper');
  
  elementsToAnimate.forEach(el => {
    el.classList.add('hidden-element'); // Clase inicial (ver CSS abajo)
    observer.observe(el);
  });

});