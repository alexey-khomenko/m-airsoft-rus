window.productTileJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.productTileJsIsLoaded) return true;

  window.productTileJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.cart[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    const buttons = document.querySelectorAll(`.cart[data-cart-add="${productId}"]`);

    for (const current of buttons) {
      current.hidden = true;
    }
  });
});
