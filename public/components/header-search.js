document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-search]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;
  const value = form.querySelector('[name="search"]').value;

  console.log('submit', action, value);
});
