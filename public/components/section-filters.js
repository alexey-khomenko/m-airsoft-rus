document.addEventListener('click', (e) => {
  const dropdown = e.target.closest('.sort-dropdown');

  if (dropdown) return true;

  const sort = document.querySelector('.sort-dropdown');

  if (!sort) return true;

  sort.open = false;
});

document.addEventListener('click', (e) => {
  const option = e.target.closest('[data-sort-option]');

  if (!option) return true;

  const {sortParam, sortValue} = option.dataset;

  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set(sortParam, sortValue);

  window.location.search = urlParams.toString();
});
