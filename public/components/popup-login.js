function resetError(input) {
  input.classList.remove('util-input-error');
}


document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-login-phone] [name="phone"]');

  if (!input) return true;

  resetError(input);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-login-phone]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;
  const input = form.querySelector('[name="phone"]');
  const value = input.value.trim();

  if (0 === value.length) {
    input.classList.add('util-input-error');
    return true;
  }

  console.log('submit', action, value);

  const step1 = document.querySelector('[data-popup-login-step="1"]');
  const step2 = document.querySelector('[data-popup-login-step="2"]');

  step1.hidden = true;
  step2.hidden = false;
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-login-cancel]');

  if (!button) return true;

  window.closePopup();
});


document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-login-code] [name="code"]');

  if (!input) return true;

  input.classList.remove('util-input-error');
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-login-code]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;
  const input = form.querySelector('[name="code"]');
  const value = input.value.trim();

  if (+input.maxLength !== value.length) {
    input.classList.add('util-input-error');
    return true;
  }

  console.log('submit', action, value);

  window.location.reload();
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-login-back]');

  if (!button) return true;

  const step1 = document.querySelector('[data-popup-login-step="1"]');
  const step2 = document.querySelector('[data-popup-login-step="2"]');

  step2.hidden = true;
  step1.hidden = false;
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
