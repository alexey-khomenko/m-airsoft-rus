document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-search]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;
  const input = form.querySelector('[name="search"]');
  const value = input.value.trim();

  console.log('submit', action, value);
});
