document.addEventListener('click', (e) => {
  const button = e.target.closest('.buy.button[data-catalog-cart-add]');

  if (!button) return true;

  document.querySelector('.button-buy-wrapper').hidden = true;
});
