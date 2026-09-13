/**
 * Cursor Glow
 * Subtle radial gradient that follows the mouse
 */

(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  // Only on desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // Smooth follow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animate);
    }

    animate();
  } else {
    glow.style.display = 'none';
  }
})();
