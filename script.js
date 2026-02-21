(() => {
  // --- Language ---
  const supportedLangs = ['cs', 'en'];
  const stored = localStorage.getItem('lang');
  const browserLang = navigator.language?.slice(0, 2);
  const defaultLang = stored || (supportedLangs.includes(browserLang) ? browserLang : 'cs');

  const html = document.documentElement;
  html.setAttribute('data-lang', defaultLang);
  html.setAttribute('lang', defaultLang === 'cs' ? 'cs' : 'en');

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-lang');
      const next = current === 'cs' ? 'en' : 'cs';
      html.setAttribute('data-lang', next);
      html.setAttribute('lang', next);
      localStorage.setItem('lang', next);
    });
  }

  // --- Theme ---
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Listen for OS preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // --- Scroll animations ---
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
  }

  // --- Enable transitions after load (prevent flash) ---
  requestAnimationFrame(() => {
    html.classList.add('loaded');
  });
})();
