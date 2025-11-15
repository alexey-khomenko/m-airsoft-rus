window.tileOrderJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tileOrderJsIsLoaded) return true;

  window.tileOrderJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-button-pay]');

    if (!button) return true;

    console.log('pay');
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-payment-id-new]');

    if (!button) return true;

    const paymentId = +button.dataset.paymentIdNew;
    const orderId = +button.closest('[data-order-id]').dataset.orderId;


    console.log('POST request to change payment');
    console.log('orderId', orderId);
    console.log('paymentId', paymentId);


    window.location.reload();
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-change-payment]');

    if (!button) return true;

    const backdrop = document.querySelector('[data-payments-backdrop]');
    const payments = backdrop.querySelector('[data-payments]');

    payments.setAttribute('data-order-id', button.dataset.orderId);
    backdrop.hidden = false;
  });

  document.addEventListener('click', (e) => {
    const backdrop = e.target.closest('[data-payments-backdrop]');
    const payments = e.target.closest('[data-payments]');
    const close = e.target.closest('[data-payments-close]');

    if (close || (backdrop && !payments)) {
      document.querySelector('[data-payments-backdrop]').hidden = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if ('Escape' !== e.key) return true;

    document.querySelector('[data-payments-backdrop]').hidden = true;
  });
});
