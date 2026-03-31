
document.body.insertAdjacentHTML('afterbegin', `
  <nav class="navbar">
    <img src="assets/logos/square.png" class="nav-logo nav-btn active" data-page="dist/f9c3a7.js" />
    <div class="nav-btns">
      <button class="nav-btn" data-page="dist/d3f751.js"><i class="fa-solid fa-gamepad"></i></button>
      <button class="nav-btn" data-page="dist/9b2e4c.js"><i class="fa-solid fa-border-all"></i></button>
      <a class="nav-btn" href="https://discord.gg/unblockings" target="_blank"><i class="fab fa-discord"></i></a>
    </div>
  </nav>
  <div id="content"></div>
`);


function loadPage(src) {
  const overlay = document.getElementById('game-overlay');
  if (overlay) overlay.remove();

  const content = document.getElementById('content');
  content.style.opacity = '0';
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-page="${src}"]`).classList.add('active');
  setTimeout(() => {
    const old = document.getElementById('_page_script');
    if (old) old.remove();
    const s = document.createElement('script');
    s.id = '_page_script';
    s.src = src + '?_=' + Date.now();
    s.onload = () => { content.style.opacity = '1'; };
    s.onerror = () => { content.style.opacity = '1'; };
    document.body.appendChild(s);
    setTimeout(() => { content.style.opacity = '1'; }, 1000);
  }, 120);
}

document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => loadPage(btn.dataset.page));
});

loadPage('dist/f9c3a7.js');
