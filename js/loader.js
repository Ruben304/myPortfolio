/**
 * Page Loader
 * Typing animation + progress bar → reveal page
 */

(function () {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const line1 = document.getElementById('loaderLine1');
  const line2 = document.getElementById('loaderLine2');
  const line3 = document.getElementById('loaderLine3');

  const codeLines = [
    '> loading modules...',
    '> compiling assets...',
    '> rendering interface...'
  ];

  const lineEls = [line1, line2, line3];

  function typeText(el, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.3s, transform 0.3s';
      const interval = setInterval(() => {
        el.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  async function runLoader() {
    // Type each line
    for (let i = 0; i < codeLines.length; i++) {
      await typeText(lineEls[i], codeLines[i], 25);
      // Progress bar
      const progress = ((i + 1) / codeLines.length) * 100;
      bar.style.width = progress + '%';
      if (i < codeLines.length - 1) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    await new Promise(r => setTimeout(r, 400));

    // Done - hide loader
    loader.classList.add('done');

    // Trigger hero animations
    await new Promise(r => setTimeout(r, 100));
    triggerHeroEntrance();

    // Show nav
    await new Promise(r => setTimeout(r, 300));
    document.getElementById('nav').classList.add('visible');
  }

  function triggerHeroEntrance() {
    const heroEls = document.querySelectorAll('.anim-hero');
    heroEls.forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || 0) * 120;
      setTimeout(() => {
        el.classList.add('in');
      }, delay);
    });
  }

  // Start loader
  if (document.readyState === 'complete') {
    runLoader();
  } else {
    window.addEventListener('load', runLoader);
  }
})();
