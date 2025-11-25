window.orderPaymentJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderPaymentJsIsLoaded) return true;

  window.orderPaymentJsIsLoaded = true;

  document.addEventListener('changeOrderCity', async () => {
    const form = document.querySelector(`[data-order-payment-reload-action]`);
    const formGrid = form.querySelector('.form-grid');
    const action = form.dataset.orderPaymentReloadAction;

    form.reset();
    formGrid.querySelector('[data-tile-order-grid-edit]').hidden = true;

    const tiles = formGrid.querySelectorAll(`[data-tile-order-grid]`);


    const responseTiles = [];
    for (const tile of tiles) {
      tile.hidden = false;
      responseTiles.push(tile.cloneNode(true));
    }


    for (const tile of tiles) tile.remove();


    console.log('POST request to', action);


    responseTiles.reverse();
    for (const tile of responseTiles) formGrid.prepend(tile);
  });

  const form = document.querySelector(`[data-form-order-payment]`);
  form.reset();

  document.addEventListener('input', async (e) => {
    const radio = e.target.closest('[name="payment"]');

    if (!radio) return true;

    const action = form.action;
    const value = radio.value;


    console.log('POST request to', action);
    console.log('payment', value);
  });
});
