window.cartAdd = function (productId, quantity) {
  const cart = document.querySelector('[data-cart-number]');
  const cartNumber = parseInt(cart.dataset.cartNumber);
  cart.setAttribute('data-cart-number', cartNumber + 1);

  console.log('cartAdd productId', productId, quantity);
};

window.cartRemove = function (positionId) {
  const cart = document.querySelector('[data-cart-number]');
  const cartNumber = parseInt(cart.dataset.cartNumber);
  cart.setAttribute('data-cart-number', cartNumber - 1);

  console.log('cartRemove positionId', positionId);
};

window.cartUpdate = function (positionId, quantity) {
  console.log('cartUpdate positionId', positionId, quantity);
};


window.fieldErrorRemove = function (input) {
  input.classList.remove('util-form-field-error');
};

window.fieldErrorAdd = function (input) {
  input.classList.add('util-form-field-error');
};

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('.util-form-field-error');

  if (!input) return true;

  window.fieldErrorRemove(input);
});
