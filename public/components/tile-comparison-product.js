window.tileComparisonProductJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tileComparisonProductJsIsLoaded) return true;

  window.tileComparisonProductJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.cart[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    window.cart.add(productId, 1);

    const buttons = document.querySelectorAll(`.cart[data-cart-add="${productId}"]`);

    for (const current of buttons) current.hidden = true;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-remove-product-id]');

    if (!button) return true;

    const wrapper = document.querySelector('[data-action-remove]');

    if (!wrapper) {
      console.log('Error: [data-action-remove] not found');
      return true;
    }

    const action = wrapper.dataset.actionRemove;
    const productId = button.dataset.removeProductId;


    console.log('POST request to', action);
    console.log('productId', productId);


    button.closest('.column').remove();

    const columns = wrapper.querySelectorAll('.column');

    if (0 === columns.length) window.location.assign(wrapper.dataset.redirectTo);
  });
});
