(function () {
  if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
    document.body.classList.add('touch-device');
    return;
  }

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  let x = 0;
  let y = 0;
  let cx = 0;
  let cy = 0;

  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  function animate() {
    cx += (x - cx) * 0.15;
    cy += (y - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const hoverTargets = 'a, button, .btn, input, textarea, select, .card, img';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove('is-hover');
  });
})();
