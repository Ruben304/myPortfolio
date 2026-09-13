/**
 * Education — tab switcher
 */

(function () {
  const tabs   = document.querySelectorAll('.edu-tab');
  const panels = document.querySelectorAll('.edu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');

      const target = document.querySelector(`.edu-panel[data-panel="${tab.dataset.tab}"]`);
      if (target) target.classList.add('active');
    });
  });
})();
