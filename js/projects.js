/**
 * Projects — hover preview + detail panel
 */

(function () {
  const rows = document.querySelectorAll('.project-row');
  const detailEl = document.getElementById('projectDetail');
  let currentId = null;
  let scrollPos = 0;
  let detailOpen = false;

  // ---- Hover Preview ----
  const preview = document.createElement('div');
  preview.className = 'project-preview';
  preview.innerHTML = `
    <div class="project-preview-browser">
      <div class="project-preview-bar">
        <div class="project-preview-dot"></div>
        <div class="project-preview-dot"></div>
        <div class="project-preview-dot"></div>
        <span class="project-preview-url"></span>
      </div>
      <img class="project-preview-img" src="" alt="">
      <video class="project-preview-video" muted loop playsinline></video>
      <div class="project-preview-caption">
        <span class="project-preview-name"></span>
        <span class="project-preview-tech"></span>
      </div>
    </div>
  `;
  document.body.appendChild(preview);

  const previewUrlEl = preview.querySelector('.project-preview-url');
  const previewImg    = preview.querySelector('.project-preview-img');
  const previewVideo  = preview.querySelector('.project-preview-video');
  const previewName   = preview.querySelector('.project-preview-name');
  const previewTech   = preview.querySelector('.project-preview-tech');

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (preview.classList.contains('visible')) {
      positionPreview();
    }
  });

  function positionPreview() {
    const offset = 22;
    const pw = preview.offsetWidth;
    const ph = preview.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = mouseX + offset;
    let y = mouseY + offset;

    if (x + pw > vw - 16) x = mouseX - pw - offset;
    if (y + ph > vh - 16) y = mouseY - ph - offset;

    preview.style.left = x + 'px';
    preview.style.top  = y + 'px';
  }

  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (detailOpen) return;
      const d = row.dataset;
      if (!d.image && !d.video) return;

      previewUrlEl.textContent = d.url || 'private prototype';
      previewName.textContent = d.title;
      previewTech.textContent = d.tech.split(',')[0].trim();

      if (d.video) {
        previewImg.hidden = true;
        previewVideo.hidden = false;
        previewVideo.src = d.video;
        previewVideo.currentTime = 0;
        previewVideo.play().catch(() => {});
      } else {
        previewVideo.hidden = true;
        previewVideo.removeAttribute('src');
        previewImg.hidden = false;
        previewImg.src = d.image;
        previewImg.alt = d.title;
      }

      positionPreview();
      preview.classList.add('visible');
    });

    row.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
      previewVideo.pause();
    });
  });

  // ---- Click to open detail ----
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const id = parseInt(row.dataset.id);
      openDetail(id);
    });
  });

  function openDetail(id) {
    const row = document.querySelector(`.project-row[data-id="${id}"]`);
    if (!row) return;

    currentId = id;
    scrollPos = window.scrollY;

    const d = row.dataset;
    const techTags = d.tech.split(',').map(t => t.trim());
    const features = d.features.split('|');
    const totalProjects = rows.length;
    const prevId = id > 0 ? id - 1 : totalProjects - 1;
    const nextId = id < totalProjects - 1 ? id + 1 : 0;
    const prevRow = document.querySelector(`.project-row[data-id="${prevId}"]`);
    const nextRow = document.querySelector(`.project-row[data-id="${nextId}"]`);
    const num = String(id + 1).padStart(2, '0');

    // Links: a project may have a live URL, a GitHub repo, both, or neither
    const hasLiveUrl = !!d.url && !d.url.startsWith('github.com/');
    const hasGithub = !!d.github;
    const metaLinks = [];
    if (hasLiveUrl) metaLinks.push({ label: '/ Live', text: d.url, href: `https://${d.url}` });
    if (hasGithub) metaLinks.push({ label: '/ Code', text: 'View on GitHub ↗', href: d.github });
    if (!hasLiveUrl && !hasGithub) metaLinks.push({ label: '/ Repo', text: 'Private prototype — no public repo' });

    const browserHref = hasLiveUrl ? `https://${d.url}` : (hasGithub ? d.github : null);
    const browserUrlText = hasLiveUrl ? `https://${d.url}` : (hasGithub ? d.github.replace('https://', '') : 'local prototype — no public link');

    // Generate ASCII decoration
    const asciiLines = [];
    for (let i = 0; i < 6; i++) {
      let line = '';
      for (let j = 0; j < 80; j++) {
        if (i === 0 || i === 5) line += j % 4 === 0 ? '/' : '=';
        else if (j === 0 || j === 79) line += '/';
        else {
          const r = Math.random();
          if (r < 0.7) line += ' ';
          else if (r < 0.82) line += '/';
          else if (r < 0.9) line += '-';
          else if (r < 0.95) line += '+';
          else line += '*';
        }
      }
      asciiLines.push(line);
    }

    detailEl.innerHTML = `
      <button class="detail-back" id="detailBack">
        <span class="detail-back-arrow">←</span> Back to projects
      </button>
      <div class="detail-inner">
        <div class="detail-num">${num}</div>

        <div class="detail-header">
          <div class="detail-title">${d.title}</div>
          <div class="detail-tagline">${d.tagline}</div>
          <div class="detail-meta">
            <div class="detail-meta-item">
              <span class="detail-meta-label">/ Role</span>
              <span class="detail-meta-value">${d.role}</span>
            </div>
            <div class="detail-meta-item">
              <span class="detail-meta-label">/ Type</span>
              <span class="detail-meta-value">${d.platform}</span>
            </div>
            <div class="detail-meta-item">
              <span class="detail-meta-label">/ Year</span>
              <span class="detail-meta-value">${d.year}</span>
            </div>
            ${metaLinks.map(m => `
            <div class="detail-meta-item">
              <span class="detail-meta-label">${m.label}</span>
              <span class="detail-meta-value">${m.href ? `<a href="${m.href}" target="_blank" rel="noopener">${m.text}</a>` : m.text}</span>
            </div>`).join('')}
          </div>
        </div>

        <div class="detail-ascii-decor">${asciiLines.join('\n')}</div>

        <div class="detail-browser">
          <div class="detail-browser-bar">
            <div class="detail-browser-dot"></div>
            <div class="detail-browser-dot"></div>
            <div class="detail-browser-dot"></div>
            <div class="detail-browser-url">${browserHref ? `<a href="${browserHref}" target="_blank" rel="noopener">${browserUrlText}</a>` : browserUrlText}</div>
          </div>
          <div class="detail-browser-body">
            ${d.video
              ? `<video class="detail-browser-video" src="${d.video}" controls muted loop playsinline></video>`
              : `<div class="detail-browser-logo">${d.title}</div><div class="detail-browser-sub">${d.tagline}</div>`}
          </div>
        </div>

        <div class="detail-about">
          <div>
            <div class="detail-about-heading">/ Overview</div>
            <div class="detail-about-text">${d.overview}</div>
          </div>
          <div>
            <div class="detail-about-heading">/ Tech Stack</div>
            <div class="detail-stack">
              ${techTags.map(t => `<span class="detail-stack-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="detail-features">
          <div class="detail-features-heading">/ Key Features</div>
          ${features.map(f => `<div class="detail-feature-item">${f}</div>`).join('')}
        </div>

        <div class="detail-ascii-decor">${asciiLines.join('\n')}</div>

        <div class="detail-nav">
          <div class="detail-nav-link prev" data-goto="${prevId}">
            ← Previous project
            <span>${prevRow ? prevRow.dataset.title : ''}</span>
          </div>
          <div class="detail-nav-link next" data-goto="${nextId}">
            Next project →
            <span>${nextRow ? nextRow.dataset.title : ''}</span>
          </div>
        </div>
      </div>
    `;

    // Open panel
    preview.classList.remove('visible');
    detailOpen = true;
    requestAnimationFrame(() => {
      detailEl.classList.add('open');
      document.body.style.overflow = 'hidden';
      detailEl.scrollTop = 0;
    });

    // Bind events
    document.getElementById('detailBack').addEventListener('click', closeDetail);

    detailEl.querySelectorAll('.detail-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const gotoId = parseInt(link.dataset.goto);
        detailEl.classList.remove('open');
        setTimeout(() => {
          openDetail(gotoId);
        }, 350);
      });
    });

    // ESC to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeDetail();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  function closeDetail() {
    detailEl.classList.remove('open');
    document.body.style.overflow = '';
    detailOpen = false;
    setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 100);
  }
})();
