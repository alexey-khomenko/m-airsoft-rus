window.productTileJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.productTileJsIsLoaded) return true;

  window.productTileJsIsLoaded = true;

  const cart = document.querySelector('[data-cart-number]');

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-catalog-cart-add]');

    if (!button) return true;

    const productId = button.dataset.catalogCartAdd;

    let cartNumber = +cart.dataset.cartNumber;

    cart.setAttribute('data-cart-number', ++cartNumber);

    console.log('catalogCartAdd', productId, cartNumber);

    button.hidden = true;
  });
});
