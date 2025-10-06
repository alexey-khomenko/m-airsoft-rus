window.productTileJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.productTileJsIsLoaded) return true;

  window.productTileJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-catalog-cart-add]');

    if (!button) return true;

    const productId = button.dataset.catalogCartAdd;

    console.log('catalogCartAdd', productId);
  });
});
