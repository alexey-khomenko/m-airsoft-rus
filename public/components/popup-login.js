window.popupLoginJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.popupLoginJsIsLoaded) return true;

  window.popupLoginJsIsLoaded = true;

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-login-phone]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const input = form.querySelector('[name="phone"]');
    const value = input.value.trim();

    if (0 === value.length || value.includes('_')) {
      window.fieldError.add(input);
      return true;
    }


    console.log('POST request to', action, value);


    const wrapper = form.closest('.popup-login');
    const step1 = wrapper.querySelector('[data-popup-login-step="1"]');
    const step2 = wrapper.querySelector('[data-popup-login-step="2"]');

    step1.hidden = true;
    step2.hidden = false;
  });

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-login-code]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const input = form.querySelector('[name="code"]');
    const value = input.value.trim();

    if (+input.maxLength !== value.length) {
      window.fieldError.add(input);
      return true;
    }


    console.log('POST request to', action, value);


    window.location.reload();
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-popup-login-back]');

    if (!button) return true;

    const wrapper = button.closest('.popup-login');

    const step1 = wrapper.querySelector('[data-popup-login-step="1"]');
    const step2 = wrapper.querySelector('[data-popup-login-step="2"]');

    step2.hidden = true;
    step1.hidden = false;


    const input = wrapper.querySelector('[data-form-login-code] [name="code"]');

    input.value = '';
  });


  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-popup-login-another-way]');

    if (!button) return true;

    console.log('Another login');
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-popup-login-yandex]');

    if (!button) return true;

    console.log('Yandex ID');
  });
});
