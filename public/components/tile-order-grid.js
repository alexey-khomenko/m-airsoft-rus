window.tileOrderGridJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tileOrderGridJsIsLoaded) return true;

  window.tileOrderGridJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const tile = e.target.closest('[data-tile-order-grid]');
    const details = e.target.closest('[data-tile-order-grid-popover]');

    if (!tile || details) return true;

    const type = tile.dataset.tileOrderGrid;
    const form = document.querySelector(`[data-form-order-${type}]`);
    const radio = tile.querySelector(`[name="${type}"]`);

    if (!radio.checked) {
      radio.checked = true;
      radio.dispatchEvent(new Event('input', {bubbles: true}));
    }

    const tiles = form.querySelectorAll(`[data-tile-order-grid]:has([name="${type}"]:not(:checked))`);

    for (const tile of tiles) {
      tile.hidden = true;
    }

    form.querySelector('[data-tile-order-grid-edit]').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const popover = e.target.closest('[data-tile-order-grid-popover]');

    if (popover) return true;

    const popovers = document.querySelectorAll('[data-tile-order-grid-popover]');

    for (const popover of popovers) popover.open = false;
  });
});
