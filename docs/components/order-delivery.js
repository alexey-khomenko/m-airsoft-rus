window.orderDeliveryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderDeliveryJsIsLoaded) return true;

  window.orderDeliveryJsIsLoaded = true;

  window.previousDeliveryId = null;

  if ('undefined' === typeof window.deliveries) window.deliveries = {};

  function mount(id) {
    if (!id) return;

    if ('undefined' === typeof window.deliveries[`delivery${id}`]) {
      console.log(`Script for 'delivery${id}' not found`);
      return;
    }

    if ('undefined' === typeof window.deliveries[`delivery${id}`].mount) {
      console.log(`Function 'delivery${id}.mount()' not found`);
      return;
    }

    const delivery = document.querySelector(`.order-delivery-${id}`);
    if (delivery) delivery.hidden = false;

    window.deliveries[`delivery${id}`].mount();
  }

  function unmount(id) {
    if (!id) return;

    if ('undefined' === typeof window.deliveries[`delivery${id}`]) {
      console.log(`Script for 'delivery${id}' not found`);
      return;
    }

    if ('undefined' === typeof window.deliveries[`delivery${id}`].unmount) {
      console.log(`Function 'delivery${id}.unmount()' not found`);
      return;
    }

    const delivery = document.querySelector(`.order-delivery-${id}`);
    if (delivery) delivery.hidden = true;

    window.deliveries[`delivery${id}`].unmount();
  }

  document.addEventListener('changeOrderCity', async () => {
    const form = document.querySelector(`[data-order-delivery-reload-action]`);
    const formGrid = form.querySelector('.form-grid');
    const action = form.dataset.orderDeliveryReloadAction;

    form.reset();
    formGrid.querySelector('[data-tile-order-grid-edit]').hidden = true;

    const tiles = formGrid.querySelectorAll(`[data-tile-order-grid]`);


    const responseDeliveries = [];
    for (const tile of tiles) {
      const deliveryId = tile.querySelector('[type="radio"]').value;
      const delivery = form.querySelector(`.order-delivery-${deliveryId}`);

      if (!delivery) continue;

      responseDeliveries.push(delivery.cloneNode(true));
      break;
    }

    const responseTiles = [];
    for (const tile of tiles) {
      tile.hidden = false;
      responseTiles.push(tile.cloneNode(true));
    }


    for (const tile of tiles) {
      const deliveryId = tile.querySelector('[type="radio"]').value;
      const delivery = form.querySelector(`.order-delivery-${deliveryId}`);

      if (delivery) {
        unmount(deliveryId);
        form.querySelector(`.order-delivery-${deliveryId}`).remove();
      }

      tile.remove();
    }


    console.log('POST request to', action);


    responseTiles.reverse();
    for (const tile of responseTiles) formGrid.prepend(tile);

    for (const delivery of responseDeliveries) form.append(delivery);

    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true})); // TODO: -
  });

  const form = document.querySelector(`[data-form-order-delivery]`);
  form.reset();

  document.addEventListener('input', (e) => {
    const radio = e.target.closest('[name="delivery"]');

    if (!radio) return true;

    const value = radio.value;

    unmount(window.previousDeliveryId);
    mount(value);

    window.previousDeliveryId = value;
    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true})); // TODO: -
  });
});
