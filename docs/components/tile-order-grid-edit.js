window.tileOrderGridEditJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tileOrderGridEditJsIsLoaded) return true;

  window.tileOrderGridEditJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const tile = e.target.closest('[data-tile-order-grid-edit]');

    if (!tile) return true;

    tile.hidden = true;

    const type = tile.dataset.tileOrderGridEdit;
    const form = document.querySelector(`[data-form-order-${type}]`);
    const tiles = form.querySelectorAll(`[data-tile-order-grid]:has([name="${type}"]:not(:checked))`);

    for (const tile of tiles) {
      tile.hidden = false;
    }
  });
});
