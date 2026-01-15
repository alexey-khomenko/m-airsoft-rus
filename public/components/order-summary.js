window.orderSummaryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderSummaryJsIsLoaded) return true;

  window.orderSummaryJsIsLoaded = true;

  const component = {
    old: document.querySelector('[data-order-summary-old]'),
    discount: document.querySelector('[data-order-summary-discount]'),
    delivery: document.querySelector('[data-order-summary-delivery]'),
    total: document.querySelector('[data-order-summary-total]'),
    update: function (info) {
      if ('old' in info) {
        if (this.old) this.old.textContent = info.old.toLocaleString('ru-RU');
      }
      else {
        console.info('info.old not found');
      }

      if ('discount' in info) {
        if (this.discount) this.discount.textContent = info.discount.toLocaleString('ru-RU');
      }
      else {
        console.info('info.discount not found');
      }

      if ('delivery' in info) {
        if (this.delivery) this.delivery.textContent = info.delivery.toLocaleString('ru-RU');
      }
      else {
        console.info('info.delivery not found');
      }

      if ('total' in info) {
        if (this.total) this.total.textContent = info.total.toLocaleString('ru-RU');
      }
      else {
        console.info('info.total not found');
      }
    },
  };

  if (!component.old) console.log('[data-order-summary-old] not found');
  if (!component.discount) console.log('[data-order-summary-discount] not found');
  if (!component.delivery) console.log('[data-order-summary-delivery] not found');
  if (!component.total) console.log('[data-order-summary-total] not found');


  document.addEventListener('updateOrderInfo', (e) => {
    component.update(e.detail);
  });

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-order-summary]');

    if (!form) return true;

    e.preventDefault();

    const checkboxes = form.querySelectorAll('.checkbox');

    for (const checkbox of checkboxes) {
      if (!checkbox.checked) return true;
    }

    const action = form.action;

    form.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));

    console.log('POST request to', action);


    await new Promise(r => setTimeout(r, 3000));
    const response = {
      'orderId': 749466,
      'info': {
        certificate: '',
        balance: 940,
        bonuses: 0,
        old: 8501,
        discount: 3001,
        delivery: 301,
        total: 15031,
      },
      'errors': [
        'Demo error',
      ],
    };


    if ('orderId' in response) {
      window.location.assign(`${form.dataset.finished}?order_id=${response.orderId}`); // TODO: finish link
    }
    else {
      if ('info' in response) {
        form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
      }
      else {
        console.info('response.info not found');
      }

      if ('errors' in response) {
        console.log('Errors:');
        for (const error of response.errors) console.log(error);
      }
      else {
        console.info('response.errors not found');
      }
    }

    form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
  });


  document.addEventListener('orderRequestSent', async () => {
    document.querySelector('.layout').classList.add('without-events');
    document.querySelector('.loader').hidden = false;
  });

  document.addEventListener('orderRequestReceived', async () => {
    document.querySelector('.loader').hidden = true;
    document.querySelector('.layout').classList.remove('without-events');
  });
});
