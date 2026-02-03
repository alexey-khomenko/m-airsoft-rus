if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries['delivery-pickup'] = {
  mount: function () {
    this.init();
    console.log('delivery-pickup mount');
    document.addEventListener('click', this.handler);
  },
  unmount: function () {
    console.log('delivery-pickup unmount');
    document.removeEventListener('click', this.handler);
  },
  handler: async function (e) {
    const select = e.target.closest('.order-delivery-pickup .select');
    const option = e.target.closest('.order-delivery-pickup .option');
    const input = e.target.closest('.order-delivery-pickup .input');

    const selected = document.querySelector('[data-pickup-selected]');
    const options = document.querySelector('[data-pickup-options]');

    if (option) {
      const value = option.dataset.pickupValue;

      options.hidden = true;

      if (selected.dataset.pickupSelected === value) return;

      selected.textContent = option.textContent;
      selected.setAttribute('data-pickup-selected', value);

      await window.setDelivery(value);

      return true;
    }

    if (input) {
      options.hidden = !options.hidden;

      return true;
    }

    if (!select) {
      options.hidden = true;

      return true;
    }
  },
  init: function () {
    const root = document.querySelector('.order-delivery-pickup');

    const deliveryId = +window.previousDeliveryId;

    const selected = root.querySelector('[data-pickup-selected]');
    const options = root.querySelector('[data-pickup-options]');
    const sample = root.querySelector('[data-pickup-sample]');

    selected.textContent = window.deliveryPickups[0].title;
    selected.setAttribute('data-pickup-selected', window.deliveryPickups[0].id);

    options.innerHTML = '';

    for (const pickup of window.deliveryPickups) {
      const option = sample.cloneNode(true);

      option.hidden = false;
      option.textContent = pickup.title;
      option.setAttribute('data-pickup-value', pickup.id);

      options.append(option);

      if (pickup.id !== deliveryId) continue;

      selected.textContent = pickup.title;
      selected.setAttribute('data-pickup-selected', pickup.id);
    }
  },
};
