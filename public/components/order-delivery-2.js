if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries.delivery2 = {
  mount: function () {
    console.log('delivery2 mount');
    document.addEventListener('click', this.handler);
  },
  unmount: function () {
    console.log('delivery2 unmount');
    document.removeEventListener('click', this.handler);
  },
  handler: async function (e) {
    const test = e.target.closest('.test-block');

    if (!test) return true;

    const delivery = 2;
    const form = document.querySelector(`[data-form-order-delivery]`);
    const action = form.action;


    console.log('POST request to', action);
    console.log('delivery', delivery);
    console.log('click!');
  },
};
