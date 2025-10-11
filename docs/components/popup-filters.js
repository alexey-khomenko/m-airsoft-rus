const filters = {
  form: document.querySelector('[data-form-filters]'),
  submit: document.querySelector('[data-submit-form-filters]'),
};

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-filters]');

  if (!form) return true;

  e.preventDefault();

  console.log('form submit');
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-filters]');

  if (!button) return true;

  filters.form.querySelector('[type="submit"]').click();
});

document.addEventListener('input', (e) => {
  const input = e.target.closest('[data-form-filters-price]');

  if (!input) return true;

  const min = +input.min;
  const max = +input.max;

  let value = +input.value;

  if (min > value) value = min;
  if (max < value) value = max;

  console.log(value, 'связанные inputs');


  input.value = value;
});
