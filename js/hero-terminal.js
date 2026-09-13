/**
 * Hero Terminal — typewriter reveal for the ~/ruben zsh panel
 */

(function () {
  const panel = document.getElementById('heroTerminal');
  if (!panel) return;

  const lines = Array.from(panel.querySelectorAll('[data-text]'));
  let started = false;

  function typeInto(node, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        node.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  async function run() {
    for (const node of lines) {
      const isCmd = node.classList.contains('hero-terminal-cmd');
      if (!isCmd) await new Promise(r => setTimeout(r, 150));
      await typeInto(node, node.dataset.text, isCmd ? 40 : 12);
      await new Promise(r => setTimeout(r, isCmd ? 280 : 220));
    }
    const cursor = document.getElementById('heroTerminalCursor');
    if (cursor) cursor.classList.add('blink');
  }

  function start() {
    if (started) return;
    started = true;
    run();
  }

  if (panel.classList.contains('in')) {
    start();
  } else {
    const observer = new MutationObserver(() => {
      if (panel.classList.contains('in')) {
        start();
        observer.disconnect();
      }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
  }
})();
