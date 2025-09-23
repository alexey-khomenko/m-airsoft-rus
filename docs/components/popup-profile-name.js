function resetError(input) {
  input.classList.remove('util-input-error');
}

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-profile-name] [name="phone"]');

  if (!input) return true;

  resetError(input);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-profile-name]');

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

  window.location.reload();
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-profile-name-cancel]');

  if (!button) return true;

  window.closePopup();
});
