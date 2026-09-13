/**
 * ASCII Art Background & Decorations
 * Generates the grid pattern background and decorative ASCII elements
 */

(function () {
  // Generate structured ASCII grid
  function generateGrid(cols, rows) {
    let grid = '';
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        if (r % 16 === 0) {
          line += c % 5 === 0 ? '/' : '=';
        } else if (c % 55 === 0) {
          line += '/';
        } else if (c % 55 === 1) {
          line += ' ';
        } else if (r % 8 === 0) {
          line += '-';
        } else {
          const rand = Math.random();
          if (rand < 0.65) line += ' ';
          else if (rand < 0.76) line += '/';
          else if (rand < 0.85) line += '-';
          else if (rand < 0.91) line += '+';
          else if (rand < 0.96) line += '*';
          else line += '=';
        }
      }
      grid += line + '\n';
    }
    return grid;
  }

  // Populate BG
  const bgEl = document.getElementById('asciiBg');
  if (bgEl) {
    bgEl.textContent = generateGrid(220, 180);
  }

  // Contact ASCII art
  const contactAscii = document.getElementById('contactAscii');
  if (contactAscii) {
    const art = [];
    for (let i = 0; i < 20; i++) {
      let line = '';
      for (let j = 0; j < 50; j++) {
        if (i === 0 || i === 19) {
          line += j % 3 === 0 ? '/' : '=';
        } else if (j === 0 || j === 49) {
          line += '/';
        } else if (i % 5 === 0) {
          line += j % 2 === 0 ? '-' : '-';
        } else {
          const r = Math.random();
          if (r < 0.75) line += ' ';
          else if (r < 0.85) line += '/';
          else if (r < 0.92) line += '*';
          else line += '+';
        }
      }
      art.push(line);
    }
    contactAscii.textContent = art.join('\n');
  }
})();
