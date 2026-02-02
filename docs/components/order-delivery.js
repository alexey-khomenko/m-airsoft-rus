window.orderDeliveryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderDeliveryJsIsLoaded) return true;

  window.orderDeliveryJsIsLoaded = true;

  function selectTile(deliveryId) {
    if (1 > +deliveryId) return;

    const radio = form.querySelector(`[name="delivery"][value="${deliveryId}"]`);

    if (radio) radio.checked = true;

    const tile = form.querySelector('.tile-order-grid:has([type="radio"]:checked)');

    if (tile) tile.click();
  }

  function buildTile(delivery, deliveryId, deliveryTile) {
    const sample = document.querySelector(`[data-tile-sample="delivery"] [data-tile-order-grid]`);

    const tile = sample.cloneNode(true);

    tile.hidden = false;

    tile.querySelector('[type="radio"]').setAttribute('value', deliveryId);
    tile.querySelector('[type="radio"]').setAttribute('aria-label', deliveryTile);
    tile.querySelector('.img').setAttribute('src', delivery.img);
    tile.querySelector('.img-checked').setAttribute('src', delivery.imgChecked);
    tile.querySelector('.name').textContent = deliveryTile;
    tile.querySelector('.info').innerHTML = delivery.info;
    tile.querySelector('[data-price]').textContent = `${delivery.price} руб.`;
    tile.querySelector('[data-days]').textContent = delivery.days;

    form.querySelector('.form-grid').prepend(tile);
  }

  function buildTiles(deliveries, deliveryId) {
    form.hidden = true;
    form.reset();
    form.querySelector('[data-tile-order-grid-edit]').hidden = true;

    deliveries.reverse();

    const tiles = form.querySelectorAll('[data-tile-order-grid]');
    for (const tile of tiles) tile.remove();

    window.deliveryPickups = [];

    for (const delivery of deliveries) {
      if (delivery.title.includes('Самовывоз')) {
        window.deliveryPickups.push(delivery);
      }
      else {
        buildTile(delivery, delivery.id, delivery.title);
      }
    }

    if (0 < window.deliveryPickups.length) {
      let id = window.deliveryPickups[0].id;

      for (const pickup of window.deliveryPickups) {
        if (pickup.id === +deliveryId) id = pickup.id;
      }

      buildTile(window.deliveryPickups[0], id, 'Самовывоз');
    }

    if (0 < deliveryId) selectTile(deliveryId);

    form.hidden = false;
  }

  window.deliveryPickups = [];
  const form = document.querySelector('[data-form-order-delivery]');

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

    await window.setDelivery(radio.value);
  });


  window.setDelivery = async function (value) {
    const action = form.action;

    form.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));

    deliveryUnmount();

    console.log('POST request to', action);
    console.log('delivery', value);


    await new Promise(r => setTimeout(r, 3000));
    const response = {
      'info': {
        deliveries: [
          {
            'id': 1,
            'title': 'Самовывоз 3',
            'img': './content/order-delivery-1.png',
            'imgChecked': './content/order-delivery-1-b.png',
            'price': 0,
            'days': '-',
            'info': 'Самовывоз означает, что вы можете забрать свой заказ из нашего магазина в течение 3х рабочих дней после подтверждения заказа менеджером интернет-магазина.',
          },
          {
            'id': 2,
            'title': 'Самовывоз 4',
            'img': './content/order-delivery-2.png',
            'imgChecked': './content/order-delivery-2.png',
            'price': 0,
            'days': '-',
            'info': '...',
          },
          {
            'id': 3,
            'title': '_Курьер',
            'img': './content/order-delivery-3.png',
            'imgChecked': './content/order-delivery-3.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
          {
            'id': 4,
            'title': '_Курьер',
            'img': './content/order-delivery-4.png',
            'imgChecked': './content/order-delivery-4.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
          {
            'id': 5,
            'title': '_Курьер',
            'img': './content/order-delivery-5.png',
            'imgChecked': './content/order-delivery-5.png',
            'price': 300,
            'days': '1-4 дня',
            'info': '...',
          },
        ],
        deliveryId: value,
        payments: [
          {
            'id': 1,
            'title': '1Оплата система быстрых платежей',
            'img': './content/order-payment-1.png',
            'imgChecked': './content/order-payment-1.png',
            'bonus': 300,
            'info': '...',
          },
          {
            'id': 2,
            'title': '2Оплата картой на сайте',
            'img': './content/order-payment-2.png',
            'imgChecked': './content/order-payment-2.png',
            'bonus': 300,
            'info': '...',
          },
          {
            'id': 3,
            'title': '3Оплатить при получении товара',
            'img': './content/order-payment-3.png',
            'imgChecked': './content/order-payment-3.png',
            'bonus': 0,
            'info': '...',
          },
          {
            'id': 4,
            'title': '4Рассрочка Тинькофф',
            'img': './content/order-payment-4.png',
            'imgChecked': './content/order-payment-4.png',
            'bonus': 0,
            'info': '...',
          },
          {
            'id': 5,
            'title': '5Яндекс Сплит',
            'img': './content/order-payment-5.png',
            'imgChecked': './content/order-payment-5.png',
            'bonus': 300,
            'info': '...',
          },
          {
            'id': 6,
            'title': '6Кредит Сбербанк',
            'img': './content/order-payment-6.png',
            'imgChecked': './content/order-payment-6.png',
            'bonus': 0,
            'info': '...',
          },
        ],
        paymentId: 0,
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

    await deliveryMount(value);

    form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
  };


  window.previousDeliveryId = null;

  if ('undefined' === typeof window.deliveries) window.deliveries = {};

  async function deliveryMount(id) {
    window.previousDeliveryId = +id;

    if (!id) return;

    if (window.deliveryPickups.some(item => item.id === +id)) id = 'pickup';


    console.log(`request to delivery-${id}`);


    if ('undefined' === typeof window.deliveries[`delivery-${id}`]) {
      console.log(`Script for 'delivery-${id}' not found`);
      return;
    }

    if ('undefined' === typeof window.deliveries[`delivery-${id}`].mount) {
      console.log(`Function 'delivery-${id}.mount()' not found`);
      return;
    }

    const delivery = document.querySelector(`.order-delivery-${id}`);
    if (delivery) delivery.hidden = false;

    window.deliveries[`delivery-${id}`].mount();
  }

  function deliveryUnmount() {
    let id = +window.previousDeliveryId;

    if (!id) return;

    if (window.deliveryPickups.some(item => item.id === id)) id = 'pickup';

    if ('undefined' === typeof window.deliveries[`delivery-${id}`]) {
      console.log(`Script for 'delivery-${id}' not found`);
      return;
    }

    if ('undefined' === typeof window.deliveries[`delivery-${id}`].unmount) {
      console.log(`Function 'delivery-${id}.unmount()' not found`);
      return;
    }

    const delivery = document.querySelector(`.order-delivery-${id}`);
    if (delivery) delivery.hidden = true;

    window.deliveries[`delivery-${id}`].unmount();


    console.log(`remove .order-delivery-${id}`);
  }
});
