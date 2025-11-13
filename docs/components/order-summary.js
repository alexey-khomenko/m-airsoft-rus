window.orderSummaryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderSummaryJsIsLoaded) return true;

  window.orderSummaryJsIsLoaded = true;

  const component = {
    action: document.querySelector('[data-order-summary-check-action]'),
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

  if (!component.action) console.log('[data-order-summary-check-action] not found');
  if (!component.old) console.log('[data-order-summary-old] not found');
  if (!component.discount) console.log('[data-order-summary-discount] not found');
  if (!component.delivery) console.log('[data-order-summary-delivery] not found');
  if (!component.total) console.log('[data-order-summary-total] not found');


  document.addEventListener('checkOrderSummary', () => {
    if (!component.action) return true;

    const action = component.action.dataset.orderSummaryCheckAction;


    console.log('POST request to', action);
    const responseAmount = {
      old: 8501,
      discount: 3001,
      delivery: 301,
      total: 15031,
    };


    component.update(responseAmount);
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form-order-summary]');

    if (!form) return true;

    e.preventDefault();

    const checkboxes = form.querySelectorAll('.checkbox');

    for (const checkbox of checkboxes) {
      if (!checkbox.checked) return true;
    }

    const action = form.action;


    console.log('POST request to', action);
    const responseOrderId = 749466;


    window.location.assign(`${form.dataset.finished}?order_id=${responseOrderId}`);
  });
});
