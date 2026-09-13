/**
 * Scroll Animations
 * IntersectionObserver-based reveal with stagger support
 */

(function () {
  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add stagger delay for siblings
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(c =>
          c.classList.contains('reveal-up') || c.classList.contains('reveal-title')
        ) : [];
        const index = siblings.indexOf(entry.target);
        const delay = Math.max(0, index) * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Parallax for section titles
  const titles = document.querySelectorAll('.section-title');

  function parallaxTitles() {
    titles.forEach(title => {
      const rect = title.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewH = window.innerHeight;
      const progress = (centerY - viewH / 2) / viewH;
      const offset = progress * -40;
      title.style.transform = `translateX(${offset}px)`;
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(parallaxTitles);
  }, { passive: true });

  // Fade the hero scroll cue once the user has actually scrolled
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    window.addEventListener('scroll', () => {
      heroScroll.classList.toggle('hidden', window.scrollY > 60);
    }, { passive: true });
  }
})();
