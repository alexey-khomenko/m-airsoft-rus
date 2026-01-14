window.orderSummaryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderSummaryJsIsLoaded) return true;

  window.orderSummaryJsIsLoaded = true;

  const component = {
    old: document.querySelector('[data-order-summary-old]'),
    discount: document.querySelector('[data-order-summary-discount]'),
    delivery: document.querySelector('[data-order-summary-delivery]'),
    total: document.querySelector('[data-order-summary-total]'),
    update: function (amount) {
      const {old, discount, delivery, total} = amount;

      if (this.old) this.old.textContent = old.toLocaleString('ru-RU');
      if (this.discount) this.discount.textContent = discount.toLocaleString('ru-RU');
      if (this.delivery) this.delivery.textContent = delivery.toLocaleString('ru-RU');
      if (this.total) this.total.textContent = total.toLocaleString('ru-RU');
    },
  };

  if (!component.old) console.log('[data-order-summary-old] not found');
  if (!component.discount) console.log('[data-order-summary-discount] not found');
  if (!component.delivery) console.log('[data-order-summary-delivery] not found');
  if (!component.total) console.log('[data-order-summary-total] not found');


  document.addEventListener('checkOrderSummary', () => {
    // TODO: -
    console.log('TODO: -');
  });

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


    await new Promise(r => setTimeout(r, 3000));
    console.log('POST request to', action);
    const responseOrderId = 749466;


    // TODO: Если были ошибки
    // form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));

    form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));

    // TODO: Если ошибок не было
    window.location.assign(`${form.dataset.finished}?order_id=${responseOrderId}`);
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
