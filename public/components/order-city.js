window.orderCityJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderCityJsIsLoaded) return true;

  window.orderCityJsIsLoaded = true;

  const component = {
    open: document.querySelector('[data-order-city-form-open]'),
    edit: document.querySelector('[data-order-city-form-edit]'),
    add: document.querySelector('[data-order-city-form-add]'),
    close: document.querySelector('[data-order-city-form-close]'),
    formSearch: document.querySelector('[data-form-order-city-search]'),
    inputSearch: document.querySelector('[data-input-order-city-search]'),
    form: document.querySelector('[data-form-order-city]'),
    output: document.querySelector('[data-order-city-output]'),
    code: document.querySelector('[data-order-city-info-code]'),
    name: document.querySelector('[data-order-city-info-name]'),
    path: document.querySelector('[data-order-city-info-path]'),
    country: document.querySelector('[data-order-city-info-country]'),
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.edit) this.edit.hidden = true;
      if (this.add) this.add.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.formSearch) this.formSearch.hidden = false;
      if (this.output) this.output.hidden = true;
    },
    closeForm: function () {
      const name = this.name.textContent.trim();

      const formIsEmpty = 0 === name.length;

      if (this.open) this.open.hidden = false;
      if (this.edit) this.edit.hidden = formIsEmpty;
      if (this.add) this.add.hidden = !formIsEmpty;
      if (this.close) this.close.hidden = true;
      if (this.formSearch) this.formSearch.hidden = true;
      if (this.output) this.output.hidden = formIsEmpty;
    },
    limit: 2,
    debounceTimer: null,
  };

  if (!component.open) console.log('[data-order-city-form-open] not found');
  if (!component.edit) console.log('[data-order-city-form-edit] not found');
  if (!component.add) console.log('[data-order-city-form-add] not found');
  if (!component.close) console.log('[data-order-city-form-close] not found');
  if (!component.formSearch) console.log('[data-form-order-city-search] not found');
  if (!component.form) console.log('[data-form-order-city] not found');
  if (!component.output) console.log('[data-order-city-output] not found');
  if (!component.code) console.log('[data-order-city-info-code] not found');
  if (!component.name) console.log('[data-order-city-info-name] not found');
  if (!component.path) console.log('[data-order-city-info-path] not found');
  if (!component.country) console.log('[data-order-city-info-country] not found');


  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-city-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-city-form-close]');

    if (close) component.closeForm();
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form-order-city-search]');

    if (form) e.preventDefault();
  });


  document.addEventListener('input', (e) => {
    const input = e.target.closest('[data-input-order-city-search]');

    if (!input) return true;

    clearTimeout(component.debounceTimer);

    const action = component.formSearch.action;
    const value = input.value.trim();

    if (component.limit > value.length) return true;

    component.debounceTimer = setTimeout(async () => {
      input.blur();
      component.form.innerHTML = '';
      input.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));


      await new Promise(r => setTimeout(r, 3000));
      console.log('POST request to', action);
      console.log('search', value);

      const response = [
        {
          'code': '0000051349',
          'name': 'Наро-Фоминск',
          'path': ', Наро-Фоминский район, Московская область, Россия',
          'country': 'Россия',
        },
        {
          'code': '0001055521',
          'name': 'Олекминск',
          'path': ', Олекминский улус, Республика Саха (Якутия), Россия',
          'country': 'Россия',
        },
        {
          'code': '1000002802225',
          'name': 'Староминская',
          'path': ', Краснодарский край, Россия',
          'country': 'Россия',
        },
        {
          'code': '0000000143',
          'name': 'Минск',
          'path': ', Минская область, Беларусь',
          'country': 'Беларусь',
        },
        {
          'code': '0000421227',
          'name': 'Староминская станица',
          'path': ', Староминский район, Краснодарский край, Россия',
          'country': 'Россия',
        },
      ];

      // const search = 'Минск'; // search = value;

      let str = '';

      for (const {code, name, path} of response) {
        // TODO: update .cities
        str += `
        <button type="button" data-order-city-new data-code="${code}" 
                style="display: block; margin-top: 1rem; width: 100%">
          <span><strong>${name}</strong>${path}</span>
        </button>
        `;
      }

      component.form.innerHTML = str;

      input.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
    }, 1000);
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-order-city-new]');

    if (!button) return true;

    e.preventDefault();

    const action = component.form.dataset.action;
    const value = button.dataset.code;

    button.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));


    await new Promise(r => setTimeout(r, 3000));
    console.log('POST request to', action);
    console.log('code', value);

    const response = {
      'city': {
        'code': '000777777',
        'name': 'Минск',
        'path': ', Белоруссия',
        'country': 'Белоруссия',
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


    const {code, name, path, country} = response.city;

    component.inputSearch.value = name ?? '';

    component.code.setAttribute('data-order-city-info-code', code ?? '');
    component.name.textContent = name ?? '';
    component.path.textContent = path ?? '';
    component.country.setAttribute('data-order-city-info-country', country ?? '');

    component.form.innerHTML = '';

    component.closeForm();

    // component.form.dispatchEvent(new CustomEvent('changeOrderCity', {bubbles: true})); // TODO: ???

    component.form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
    component.form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
  });
});
