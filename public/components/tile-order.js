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
    const button = e.target.closest('[data-change-payment]');

    if (!button) return true;

    console.log('change', button.dataset.orderId);
  });
});
