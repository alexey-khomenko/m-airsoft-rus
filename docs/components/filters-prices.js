const prices = {
  minInput: document.querySelector('[data-form-filters-price="min"]'),
  maxInput: document.querySelector('[data-form-filters-price="max"]'),
  debounceTimer: null,
};

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);

  for (let pair of urlParams.entries()) {
    let [name, value] = pair;

    name = name.trim();
    value = value.trim();

    if (0 === name.length || 0 === value.length || 'Y' === value) continue;

    const input = document.querySelector(`[name="${name}"]`);

    if (input) input.value = value;
  }

  document.addEventListener('input', (e) => {
    const currentInput = e.target.closest('[data-form-filters-price]');

    if (!currentInput) return true;

    clearTimeout(prices.debounceTimer);

    let currentValue = currentInput.value.trim();

    if (0 === currentValue.length) return true;

    currentValue = parseInt(currentValue);

    const currentMin = parseInt(currentInput.min);
    const currentMax = parseInt(currentInput.max);

    if (currentMin > currentValue) currentValue = currentMin;
    if (currentMax < currentValue) currentValue = currentMax;

    prices.debounceTimer = setTimeout(() => {
      const minValue = parseInt(prices.minInput.value);
      const maxValue = parseInt(prices.maxInput.value);

      if (currentInput === prices.minInput && maxValue) {
        if (currentValue >= maxValue) currentValue = maxValue - 1;
      }

      if (currentInput === prices.maxInput && minValue) {
        if (currentValue <= minValue) currentValue = minValue + 1;
      }

      currentInput.value = currentValue;
    }, 1000);
  });
});
