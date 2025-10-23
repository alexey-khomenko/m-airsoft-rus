window.removeError = function (input) {
  input.classList.remove('util-form-field-error');
};

window.addError = function (input) {
  input.classList.add('util-form-field-error');
};

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-cart-add]');

  if (!button) return true;

  const productId = button.dataset.cartAdd;

  const cart = document.querySelector('[data-cart-number]');

  let cartNumber = +cart.dataset.cartNumber;

  cart.setAttribute('data-cart-number', ++cartNumber);

  console.log('cartAdd', productId, cartNumber);
});
