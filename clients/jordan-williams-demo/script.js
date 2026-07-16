document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: transparent → frosted glass ---- */
  const navbar = document.querySelector('.navbar');
  const tick = () => navbar.classList.toggle('scrolled', window.scrollY > 70);
  window.addEventListener('scroll', tick, { passive: true });
  tick();

  /* ---- MOBILE MENU ---- */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  toggle?.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
  document.addEventListener('click', e => {
    if (!toggle?.contains(e.target) && !menu?.contains(e.target)) {
      menu?.classList.remove('active');
      toggle?.classList.remove('active');
    }
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      const heading = target.querySelector('h2, h3, .section-title') || target;
      const top = heading.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- INTERSECTION OBSERVER (shared) ---- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  /* ---- SECTION TITLES: slide-in ---- */
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('reveal');
    revealObs.observe(el);
  });

  /* ---- STAGGER REVEALS ---- */
  const groups = [
    { parent: '.stats-grid',      child: '.stat-card',      delay: 65  },
    { parent: '.highlights-grid', child: '.highlight-card', delay: 80  },
    { parent: '.showcase-grid',   child: '.showcase-card',  delay: 90  },
    { parent: '.about-details',   child: '.detail-item',    delay: 38  },
    { parent: '.contact-columns', child: '.contact-group',  delay: 110 },
    { parent: '.career-category', child: '.career-item',    delay: 90  },
  ];

  groups.forEach(({ parent, child, delay }) => {
    document.querySelectorAll(parent).forEach(container => {
      [...container.querySelectorAll(child)].forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * delay}ms`;
        revealObs.observe(el);
      });
    });
  });

  // Schedule blocks as whole units
  document.querySelectorAll('.schedule-block').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 100}ms`;
    revealObs.observe(el);
  });

  // About image + text columns
  document.querySelectorAll('.about-image, .about-text').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 120}ms`;
    revealObs.observe(el);
  });

  /* ---- STAT COUNTER  (handles int, float, %) ---- */
  function animateValue(el, rawStr, duration) {
    const hasPct  = rawStr.endsWith('%');
    const isFloat = rawStr.includes('.');
    const target  = parseFloat(rawStr);
    if (isNaN(target) || target === 0) return;

    const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const v = target * (1 - Math.pow(1 - t, 3));
      el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + (hasPct ? '%' : '');
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateValue(e.target, e.target.textContent.trim(), 1500);
      statObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObs.observe(el));

  /* ---- CAREER PHOTO PARALLAX (subtle) ---- */
  const careerPhotos = document.querySelectorAll('.career-photo');
  if (careerPhotos.length) {
    window.addEventListener('scroll', () => {
      careerPhotos.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const ratio = (rect.top / window.innerHeight - 0.5) * 0.12;
        img.style.objectPosition = `center ${50 + ratio * 100}%`;
      });
    }, { passive: true });
  }

});
