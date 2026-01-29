window.orderPaymentJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderPaymentJsIsLoaded) return true;

  window.orderPaymentJsIsLoaded = true;

  document.addEventListener('updateOrderInfo', async (e) => {
    form.hidden = true;
    form.reset();
    form.querySelector('[data-tile-order-grid-edit]').hidden = true;

    if ('payments' in e.detail) {
      const payments = e.detail.payments;

      const tiles = form.querySelectorAll(`.form-grid [data-tile-order-grid]`);
      for (const tile of tiles) tile.remove();

      const sample = form.querySelector(`[data-tile-sample] [data-tile-order-grid]`);

      payments.reverse();
      for (const payment of payments) {
        const tile = sample.cloneNode(true);

        tile.hidden = false;

        tile.querySelector('[type="radio"]').setAttribute('value', payment.id);
        tile.querySelector('[type="radio"]').setAttribute('aria-label', payment.title);
        tile.querySelector('.img').setAttribute('src', payment.img);
        tile.querySelector('.img-checked').setAttribute('src', payment.imgChecked);
        tile.querySelector('.name').textContent = payment.title;
        tile.querySelector('.info').innerHTML = payment.info;

        if (0 < payment.bonus) {
          tile.querySelector('.payment-bonus').textContent = `${payment.bonus} руб.`;
        }
        else {
          tile.querySelector('.payment-text').textContent = '';
        }

        form.querySelector('.form-grid').prepend(tile);
      }
    }
    else {
      console.info('info.payments found');
    }

    if ('paymentId' in e.detail) {
      const paymentId = e.detail.paymentId;

      if (0 < paymentId) {
        const radio = form.querySelector(`[name="payment"][value="${paymentId}"]`);

        if (radio) radio.setAttribute('checked', '');

        const tile = form.querySelector('.tile-order-grid:has([type="radio"][checked])');

        if (tile) tile.click();
      }
    }
    else {
      console.info('info.payment not found');
    }

    form.hidden = false;
  });

  const form = document.querySelector(`[data-form-order-payment]`);

  (() => {
    form.reset();

    const tile = form.querySelector('.tile-order-grid:has([type="radio"][checked])');

    if (tile) tile.click();
  })();

  document.addEventListener('input', async (e) => {
    const radio = e.target.closest('[name="payment"]');

    if (!radio) return true;

    const action = form.action;
    const value = radio.value;

    radio.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));

    console.log('POST request to', action);
    console.log('payment', value);


    await new Promise(r => setTimeout(r, 3000));
    const response = {
      'info': {
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
        paymentId: value,
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
  });
});
