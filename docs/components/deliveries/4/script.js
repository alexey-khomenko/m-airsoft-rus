if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries['delivery-4'] = {
  mount: function () {
    document.addEventListener('click', this.handler);
    console.log('delivery-4 mount');
  },
  unmount: function () {
    document.removeEventListener('click', this.handler);
    console.log('delivery-4 unmount');
  },
  handler: async function (e) {
    const test = e.target.closest('.test-block');

    if (!test) return true;

    const delivery = 4;
    const form = document.querySelector(`[data-form-order-delivery]`);
    const action = form.action;


    console.log('POST request to', action);
    console.log('delivery', delivery);
    console.log('click!');
  },
};
