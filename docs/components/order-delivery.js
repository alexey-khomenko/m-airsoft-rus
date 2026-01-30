window.orderDeliveryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderDeliveryJsIsLoaded) return true;

  window.orderDeliveryJsIsLoaded = true;

  // TODO:
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
  });


  function buildTiles(deliveries, deliveryId) {
    form.hidden = true;
    form.reset();
    form.querySelector('[data-tile-order-grid-edit]').hidden = true;
    deliveries.reverse();

    const sample = document.querySelector(`[data-tile-sample="delivery"] [data-tile-order-grid]`);

    const tiles = form.querySelectorAll(`.form-grid [data-tile-order-grid]`);
    for (const tile of tiles) tile.remove();


    for (const delivery of deliveries) {
      const tile = sample.cloneNode(true);

      tile.hidden = false;

      tile.querySelector('[type="radio"]').setAttribute('value', delivery.id);
      tile.querySelector('[type="radio"]').setAttribute('aria-label', delivery.title);
      tile.querySelector('.img').setAttribute('src', delivery.img);
      tile.querySelector('.img-checked').setAttribute('src', delivery.imgChecked);
      tile.querySelector('.name').textContent = delivery.title;
      tile.querySelector('.info').innerHTML = delivery.info;
      tile.querySelector('[data-price]').textContent = `${delivery.price} руб.`;
      tile.querySelector('[data-days]').textContent = delivery.days;

      form.querySelector('.form-grid').prepend(tile);
    }


    if (0 < deliveryId) {
      const radio = form.querySelector(`[name="delivery"][value="${deliveryId}"]`);

      if (radio) radio.checked = true;
    }


    const tile = form.querySelector('.tile-order-grid:has([type="radio"]:checked)');

    if (tile) tile.click();

    form.hidden = false;
  }

  const form = document.querySelector(`[data-form-order-delivery]`);

  setTimeout(() => {
    buildTiles(JSON.parse(form.dataset.deliveries), form.dataset.deliveryId);
  }, 10);

  document.addEventListener('updateOrderInfo', async (e) => {
    if ('deliveries' in e.detail && 'deliveryId' in e.detail) {
      buildTiles(e.detail.deliveries, e.detail.deliveryId);
    }
    else {
      console.info('info.deliveries not found');
      console.info('info.deliveryId not found');
    }
  });

  document.addEventListener('input', async (e) => {
    const radio = e.target.closest('[name="delivery"]');

    if (!radio) return true;

    const action = form.action;
    const value = radio.value;

    radio.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));

    console.log('POST request to', action);
    console.log('delivery', value);


    await new Promise(r => setTimeout(r, 3000));
    const response = {
      'info': {
        deliveries: [
          {
            'id': 1,
            'title': '_Самовывоз',
            'img': './content/order-delivery-1.png',
            'imgChecked': './content/order-delivery-1-b.png',
            'price': 0,
            'days': '1-4 дня',
            'info': 'Самовывоз означает, что вы можете забрать свой заказ из нашего магазина в течение 3х рабочих дней после подтверждения заказа менеджером интернет-магазина.',
          },
          {
            'id': 2,
            'title': '_Самовывоз',
            'img': './content/order-delivery-2.png',
            'imgChecked': './content/order-delivery-2.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
          {
            'id': 3,
            'title': '_Самовывоз',
            'img': './content/order-delivery-3.png',
            'imgChecked': './content/order-delivery-3.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
          {
            'id': 4,
            'title': '_Самовывоз',
            'img': './content/order-delivery-4.png',
            'imgChecked': './content/order-delivery-4.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
          {
            'id': 5,
            'title': '_Самовывоз',
            'img': './content/order-delivery-5.png',
            'imgChecked': './content/order-delivery-5.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
        ],
        deliveryId: value,
        certificate: 'XXXX-XXXX-XXXX',
        balance: 940,
        bonuses: 10,
        old: 8501,
        discount: 3001,
        delivery: 301,
        total: 15031,
      },
    };


    if ('info' in response) {
      form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
    }
    else {
      console.info('response.info not found');
    }

    form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));

    // TODO:
    //   unmount(window.previousDeliveryId);
    //   mount(value);
    //   window.previousDeliveryId = value;
  });
});
