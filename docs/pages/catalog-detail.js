document.addEventListener('click', (e) => {
  const button = e.target.closest('.buy.button[data-cart-add]');

  if (button) button.closest('.button-buy-wrapper').hidden = true;
});
