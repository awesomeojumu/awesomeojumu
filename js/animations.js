(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 768px)').matches;

  function showAll() {
    document.querySelectorAll(
      '.hero-word, .hero-line-2, .hero-name, .hero-roles, .hero-ctas, .site-nav, .reveal, .card'
    ).forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
      el.classList.add('is-visible');
    });
    document.querySelectorAll('.section-heading-wrap').forEach((el) => {
      el.classList.add('revealed');
    });
    document.documentElement.classList.add('animations-ready');
  }

  if (reduced) {
    document.body.classList.add('reduced-motion');
    showAll();
    return;
  }

  /* Scroll reveals — CSS handles visibility; JS adds class */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  document.querySelectorAll('.card').forEach((el) => revealObserver.observe(el));

  document.querySelectorAll('.section-heading-wrap').forEach((el) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
  });

  /* Hero in viewport — show eyebrow immediately */
  document.querySelectorAll('.home-hero .reveal').forEach((el) => {
    el.classList.add('is-visible');
  });

  if (typeof gsap === 'undefined') {
    showAll();
    return;
  }

  let scrollTriggerOk = false;
  try {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerOk = true;
    }
  } catch (e) {
    console.warn('ScrollTrigger unavailable', e);
  }

  const nav = document.querySelector('.site-nav');
  if (nav) {
    gsap.fromTo(nav, { y: -20 }, { y: 0, duration: 0.5, ease: 'power2.out', delay: 0.05, clearProps: 'transform' });
  }

  const heroWords = document.querySelectorAll('.hero-word');
  const heroLine2 = document.querySelector('.hero-line-2');
  const heroName = document.querySelector('.hero-name');
  const heroRoles = document.querySelector('.hero-roles');
  const heroCtas = document.querySelector('.hero-ctas');

  if (heroWords.length && !mobile) {
    gsap.fromTo(
      heroWords,
      { y: 14 },
      { y: 0, duration: 0.45, stagger: 0.12, ease: 'power2.out', delay: 0.25, clearProps: 'transform' }
    );
    if (heroLine2) {
      gsap.fromTo(
        heroLine2,
        { y: 16, opacity: 0.3 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.25 + heroWords.length * 0.12 + 0.5, clearProps: 'transform' }
      );
    }
  }

  if (heroName) {
    gsap.fromTo(heroName, { y: 10 }, { y: 0, duration: 0.5, delay: mobile ? 0.1 : 1.2, ease: 'power2.out', clearProps: 'transform' });
  }
  if (heroRoles) {
    gsap.fromTo(heroRoles, { y: 8 }, { y: 0, duration: 0.45, delay: mobile ? 0.2 : 1.35, ease: 'power2.out', clearProps: 'transform' });
  }
  if (heroCtas) {
    gsap.fromTo(heroCtas, { y: 12 }, { y: 0, duration: 0.45, delay: mobile ? 0.3 : 1.5, ease: 'power2.out', clearProps: 'transform' });
  }

  if (scrollTriggerOk) {
    document.querySelectorAll('[data-stagger-section]').forEach((section) => {
      const items = section.querySelectorAll('.reveal, .card');
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onComplete: function () {
            this.targets().forEach((t) => t.classList.add('is-visible'));
          },
        }
      );
    });
  }

  document.documentElement.classList.add('animations-ready');

  /* Safety: never leave hero blank */
  setTimeout(showAll, 4000);
})();
