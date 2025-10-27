window.cartAdd = function (productId, number) {
  const cart = document.querySelector('[data-cart-number]');

  let cartNumber = +cart.dataset.cartNumber;

  cart.setAttribute('data-cart-number', ++cartNumber);

  console.log('cartAdd', productId, number);
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
