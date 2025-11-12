window.orderSummaryJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderSummaryJsIsLoaded) return true;

  window.orderSummaryJsIsLoaded = true;

  // TODO listen to change event on delivery

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
    const orderId = 749466;


    window.location.assign(`${form.dataset.finished}?order_id=${orderId}`);
  });
});
