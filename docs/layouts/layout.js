window.cart = {
  add: function (productId, quantity) {
    const cart = document.querySelector('[data-cart-number]');
    const cartNumber = parseInt(cart.dataset.cartNumber);
    cart.setAttribute('data-cart-number', cartNumber + 1);


    console.log('POST request to add product into the cart');
    console.log('productId', productId);
    console.log('quantity', quantity);
  },
  remove: function (productId) {
    const cart = document.querySelector('[data-cart-number]');
    const cartNumber = parseInt(cart.dataset.cartNumber);
    cart.setAttribute('data-cart-number', cartNumber - 1);


    console.log('POST request to remove product from the cart');
    console.log('productId', productId);
  },
  update: function (productId, quantity) {
    console.log('POST request to update product in the cart');
    console.log('productId', productId);
    console.log('quantity', quantity);
  },
};

window.favourite = {
  add: function (productId) {
    console.log('POST request to add product into the favourite');
    console.log('productId', productId);
  },
  remove: function (productId) {
    console.log('POST request to remove product from the favourite');
    console.log('productId', productId);
  },
};

window.comparison = {
  add: function (productId) {
    console.log('POST request to add product into the comparison');
    console.log('productId', productId);
  },
  remove: function (productId) {
    if ('undefined' === typeof productId) {
      console.log('POST request to remove all products from the comparison');
    }
    else {
      console.log('POST request to remove product from the comparison');
      console.log('productId', productId);
    }
  },
};

window.fieldError = {
  remove: function (input) {
    input.classList.remove('util-form-field-error');
  },
  add: function (input) {
    input.classList.add('util-form-field-error');
  },
};

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('.util-form-field-error');

  if (!input) return true;

  window.fieldError.remove(input);
});
