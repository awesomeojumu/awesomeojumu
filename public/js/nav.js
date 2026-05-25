(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const SCROLL_THRESHOLD = 80;

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-solid');
    } else {
      nav.classList.remove('is-solid');
    }
  }

  function closeMobile() {
    if (mobileNav) mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobile));
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Page transitions */
  const overlay = document.querySelector('.page-transition');
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (overlay && !isReduced) {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
      if (href.startsWith('http') && !href.includes(location.hostname)) return;

      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        overlay.classList.add('is-leaving');
        document.body.style.transform = 'translateY(-40px)';
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    });
  }

  /* Mark active nav link */
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach((a) => {
    try {
      const linkUrl = new URL(a.getAttribute('href'), location.origin);
      const linkPath = linkUrl.pathname.replace(/\/$/, '') || '/';
      if (linkPath === path) a.classList.add('is-active');
    } catch (_) { /* ignore malformed href */ }
  });

})();
