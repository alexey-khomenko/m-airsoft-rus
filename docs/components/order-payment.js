window.orderPaymentJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderPaymentJsIsLoaded) return true;

  window.orderPaymentJsIsLoaded = true;

  document.addEventListener('changeOrderCity', () => {
    const form = document.querySelector(`[data-order-payment-reload-action]`);
    const action = form.dataset.orderPaymentReloadAction;

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
  });

  document.addEventListener('input', (e) => {
    const radio = e.target.closest('[name="payment"]');

    if (!radio) return true;

    const form = document.querySelector(`[data-form-order-payment]`);
    const action = form.action;
    const value = radio.value;


    console.log('POST request to', action);
    console.log('payment', value);
  });
});
