window.tileComparisonProductJsIsLoaded = false;

window.addEventListener('load', async () => {
  if (window.tileComparisonProductJsIsLoaded) return true;

  window.tileComparisonProductJsIsLoaded = true;

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('.cart[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    await window.cart.add(productId, 1);

    const buttonsTo = document.querySelectorAll(`.cart[data-cart-add="${productId}"]`);
    const buttonsIn = document.querySelectorAll(`.cart[data-cart-in="${productId}"]`);

    for (const current of buttonsTo) current.hidden = true;
    for (const current of buttonsIn) current.hidden = false;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.removeProductId;

    await window.comparison.remove(productId);

    const columns = document.querySelectorAll(`.column[data-product-id="${productId}"]`);

    for (const column of columns) {
      column.remove();
    }

    const removeAll = document.querySelector('[data-remove-all]');
    const productColumns = document.querySelectorAll('.comparison-products .column');

    if (0 === productColumns.length) window.location.assign(removeAll.dataset.redirectTo);
  });
});
