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

  const urlParams = new URLSearchParams(window.location.search);
  const pagination = document.querySelector('[data-page-param]');

  if (pagination) {
    urlParams.delete(pagination.dataset.pageParam);
  }

  const {sortParam, sortValue} = option.dataset;

  if (0 < sortValue.length) {
    urlParams.set(sortParam, sortValue);
  }
  else {
    urlParams.delete(sortParam);
  }

  window.location.search = urlParams.toString();
});
