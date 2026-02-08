if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries['delivery-3'] = {
  mount: function () {
    document.addEventListener('input', this.handler);
    console.log('delivery-3 mount');
  },
  unmount: function () {
    document.removeEventListener('input', this.handler);
    console.log('delivery-3 unmount');
  },
  handler: async function (e) {
    const select = e.target.closest('.order-delivery-3 [name="office"]');

    if (!select) return true;

    const delivery = 3;
    const form = document.querySelector(`[data-form-order-delivery]`);
    const action = form.action;
    const value = select.value;

    if (0 === value.length) return true;


    console.log('POST request to', action);
    console.log('delivery', delivery);
    console.log('office', value);
  },
};
