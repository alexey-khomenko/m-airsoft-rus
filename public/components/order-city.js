window.orderCityJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderCityJsIsLoaded) return true;

  window.orderCityJsIsLoaded = true;

  const component = {
    form: document.querySelector('[data-form-order-city]'),
    limit: 3,
    debounceTimer: null,
  };

  if (!component.form) console.log('[data-form-order-city] not found');


  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form-order-city]');

    if (form) e.preventDefault();
  });


  document.addEventListener('input', (e) => {
    // TODO: переделать в форму
    const input = e.target.closest('[data-input-order-city]');

    if (!input) return true;

    clearTimeout(component.debounceTimer);

    const action = component.form.action;
    const value = input.value.trim();

    if (component.limit > value.length) return true;

    component.debounceTimer = setTimeout(async () => {
      input.blur();
      input.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));


      await new Promise(r => setTimeout(r, 3000));
      console.log('POST request to', action);
      console.log('code', value);

      const response = {
        'city': {
          'code': '0000103664',
          'name': 'Санкт-Петербург',
          'path': 'Санкт-Петербург, Россия',
          'country': 'Россия',
        },
        'info': {
          certificate: 'XXXX-XXXX-XXXX',
          balance: 940,
          bonuses: 10,
          old: 8501,
          discount: 3001,
          delivery: 301,
          total: 15031,
        },
      };


      input.value = response.city.path;

      input.dispatchEvent(new CustomEvent('changeOrderCity', {bubbles: true}));

      input.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
      input.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
    }, 1000);
  });
});
