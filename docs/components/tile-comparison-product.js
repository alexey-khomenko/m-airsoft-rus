window.tileComparisonProductJsIsLoaded = false;

window.addEventListener('load', async () => {
  if (window.tileComparisonProductJsIsLoaded) return true;

  window.tileComparisonProductJsIsLoaded = true;

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('.cart[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    await window.cart.add(productId, 1);

    const buttons = document.querySelectorAll(`.cart[data-cart-add="${productId}"]`);

    for (const current of buttons) current.hidden = true;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.removeProductId;

    await window.comparison.remove(productId);

    button.closest('.column').remove();

    const removeAll = document.querySelector('[data-remove-all]');
    const columns = document.querySelectorAll('.comparison-wrapper .column');

    if (0 === columns.length) window.location.assign(removeAll.dataset.redirectTo);
  });
});
