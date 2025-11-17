if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries.delivery1 = {
  mount: function () {
    console.log('delivery1 mount');
    document.addEventListener('input', this.handler);
  },
  unmount: function () {
    console.log('delivery1 unmount');
    document.removeEventListener('input', this.handler);
  },
  handler: function (e) {
    const select = e.target.closest('.order-delivery-1 [name="office"]');

    if (!select) return true;

    const delivery = 1;
    const form = document.querySelector(`[data-form-order-delivery]`);
    const action = form.action;
    const value = select.value;

    if (0 === value.length) return true;


    console.log('POST request to', action);
    console.log('delivery', delivery);
    console.log('office', value);
  },
};
