window.orderDeliveryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderDeliveryJsIsLoaded) return true;

  window.orderDeliveryJsIsLoaded = true;

  document.addEventListener('changeOrderCity', () => {
    const form = document.querySelector(`[data-order-delivery-reload-action]`);
    const action = form.dataset.orderDeliveryReloadAction;

    form.reset();
    form.querySelector('[data-tile-order-grid-edit]').hidden = true;

    const tiles = form.querySelectorAll(`[data-tile-order-grid]`);


    const responseTiles = [];
    for (const tile of tiles) {
      tile.hidden = false;
      responseTiles.push(tile.cloneNode(true));
    }


    for (const tile of tiles) tile.remove();


    console.log('POST request to', action);


    responseTiles.reverse();
    for (const tile of responseTiles) form.prepend(tile);

    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true}));
  });

  document.addEventListener('input', (e) => {
    const radio = e.target.closest('[name="delivery"]');

    if (!radio) return true;

    const form = document.querySelector(`[data-form-order-delivery]`);
    const action = form.action;
    const value = radio.value;


    console.log('POST request to', action);
    console.log('delivery', value);


    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true}));
  });

  // TODO Дополнительные поля доставки
});
