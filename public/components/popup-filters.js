const filter = {
  minInput: document.querySelector('[data-form-filters-price="min"]'),
  maxInput: document.querySelector('[data-form-filters-price="max"]'),
  submit: document.querySelector('[data-form-filters] [type="submit"]'),
  debounceTimer: null,
};

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-filters]');

  if (!form) return true;

  e.preventDefault();

  const sort = document.querySelector('[data-sort-value]');
  const urlParams = new URLSearchParams(window.location.search);

  const {sortParam, sortValue} = sort.dataset;

  let filters = `${form.action}${urlParams.get('q') ? '&' : '?'}${sortParam}=${sortValue}`;

  const formData = new FormData(form);
  for (let pair of formData.entries()) {
    let [name, value] = pair;

    name = name.trim();
    value = value.trim();

    if (0 === name.length || 0 === value.length) continue;

    filters += `&${name}=${value}`;
  }

  window.location.assign(filters);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-filters]');

  if (button) filter.submit.click();
});

document.addEventListener('input', (e) => {
  const currentInput = e.target.closest('[data-form-filters-price]');

  if (!currentInput) return true;

  clearTimeout(filter.debounceTimer);

  let currentValue = currentInput.value.trim();

  if (0 === currentValue.length) return true;

  currentValue = parseInt(currentValue);

  const currentMin = parseInt(currentInput.min);
  const currentMax = parseInt(currentInput.max);

  if (currentMin > currentValue) currentValue = currentMin;
  if (currentMax < currentValue) currentValue = currentMax;

  filter.debounceTimer = setTimeout(() => {
    const minValue = parseInt(filter.minInput.value);
    const maxValue = parseInt(filter.maxInput.value);

    if (currentInput === filter.minInput && maxValue) {
      if (currentValue >= maxValue) currentValue = maxValue - 1;
    }

    if (currentInput === filter.maxInput && minValue) {
      if (currentValue <= minValue) currentValue = minValue + 1;
    }

    currentInput.value = currentValue;
  }, 1000);
});

// TODO сворачивание и разворачивание фильтров
