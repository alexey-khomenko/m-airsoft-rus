document.addEventListener('click', (e) => {
  const button = e.target.closest('.buy.button[data-cart-add]');

  if (!button) return true;

  const productId = button.dataset.cartAdd;

  window.cartAdd(productId, 1);

  button.closest('.button-buy-wrapper').hidden = true;
});
