document.addEventListener('click', (e) => {
  const step1 = e.target.closest('[data-popup-login-step="1"]');

  if (!step1) return true;

  const step2 = step1.closest('.popup-login').querySelector('[data-popup-login-step="2"]');

  if (!step2) return true;

  step1.hidden = true;
  step2.hidden = false;
});

document.addEventListener('click', (e) => {
  const step2 = e.target.closest('[data-popup-login-step="2"]');

  if (!step2) return true;

  const step1 = step2.closest('.popup-login').querySelector('[data-popup-login-step="1"]');

  if (!step1) return true;

  step2.hidden = true;
  step1.hidden = false;
});


document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-login-another-way]');

  if (!button) return true;

  console.log('Another login'); // TODO: popup login
});
