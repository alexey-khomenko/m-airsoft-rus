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
    const input = e.target.closest('[data-input-order-city]');

    if (!input) return true;

    clearTimeout(component.debounceTimer);

    const action = component.form.action;
    const value = input.value.trim();

    if (component.limit > value.length) return true;

    component.debounceTimer = setTimeout(() => {


      console.log('POST request to', action);
      console.log('city', value);
      const responseCity = value;
      console.log('responseCity', responseCity);


      input.value = responseCity;
      input.dispatchEvent(new CustomEvent('changeOrderCity', {bubbles: true}));
    }, 1000);
  });
});
