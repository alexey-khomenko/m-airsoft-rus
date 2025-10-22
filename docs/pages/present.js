document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-present]');

  if (!form) return true;

  e.preventDefault();

  console.log('submit');
});
