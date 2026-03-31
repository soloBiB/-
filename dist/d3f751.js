(function() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="games-grid" id="games-grid"></div>`;

  fetch('dist/9qwndh.json')
    .then(r => r.json())
    .then(games => {
      const grid = document.getElementById('games-grid');
      if (!grid) return;
      games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
          <img src="${game.cover}" alt="${game.name}" loading="lazy" />
          <div class="game-card-name">${game.name}</div>
        `;
        card.addEventListener('click', () => openGame(game));
        grid.appendChild(card);
      });
    });

  function openGame(game) {
    const existing = document.getElementById('game-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'game-overlay';
    overlay.innerHTML = `
      <div id="game-overlay-bar">
        <span id="game-overlay-title">${game.name}</span>
        <button id="game-overlay-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;

    const frame = document.createElement('iframe');
    frame.id = 'game-frame';
    frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-orientation-lock';
    frame.allowFullscreen = true;
    overlay.appendChild(frame);

    const gameUrl = game.url;
    const baseUrl = gameUrl.substring(0, gameUrl.lastIndexOf('/') + 1);

    fetch(gameUrl + '?utm=solo-central')
      .then(r => r.text())
      .then(html => {
        const base = `<base href="${baseUrl}">`;
        html = html.replace(/<head>/i, `<head>${base}`);
        if (!html.includes(base)) html = base + html;
        frame.srcdoc = html;
      })
      .catch(() => { frame.src = gameUrl; });

    document.body.appendChild(overlay);
    document.getElementById('game-overlay-close').addEventListener('click', () => overlay.remove());
  }
})();
