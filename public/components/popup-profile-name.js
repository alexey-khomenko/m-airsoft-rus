document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-profile-name] input');

  if (!input) return true;

  input.classList.remove('util-input-error');
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-profile-name]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;

  let errors = false;

  const inputLastName = form.querySelector('[name="last-name"]');
  const valueLastName = inputLastName.value.trim();

  if (0 === valueLastName.length) {
    inputLastName.classList.add('util-input-error');
    errors = true;
  }

  const inputFirstName = form.querySelector('[name="first-name"]');
  const valueFirstName = inputFirstName.value.trim();

  if (0 === valueFirstName.length) {
    inputFirstName.classList.add('util-input-error');
    errors = true;
  }

  const inputMiddleName = form.querySelector('[name="middle-name"]');
  const valueMiddleName = inputMiddleName.value.trim();

  if (0 === valueMiddleName.length) {
    inputMiddleName.classList.add('util-input-error');
    errors = true;
  }

  const inputEmail = form.querySelector('[name="email"]');
  const valueEmail = inputEmail.value.trim();

  if (0 === valueEmail.length || !valueEmail.includes('@')) {
    inputEmail.classList.add('util-input-error');
    errors = true;
  }

  if (errors) return true;

  console.log('submit', action, valueLastName, valueFirstName, valueMiddleName, valueEmail);

  window.location.reload();
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-profile-name-cancel]');

  if (!button) return true;

  window.closePopup();
});
