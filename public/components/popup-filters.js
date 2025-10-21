window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);

  for (let pair of urlParams.entries()) {
    let [name, value] = pair;

    name = name.trim();
    value = value.trim();

    if (0 === name.length || 0 === value.length || 'Y' !== value) continue;

    document.querySelector(`[name="${name}"]`).checked = true;
  }
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-filters]');

  if (!form) return true;

  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const pagination = document.querySelector('[data-page-param]');

  if (pagination) {
    urlParams.delete(pagination.dataset.pageParam);
  }

  const params = [];

  const {sortParam, sortValue} = document.querySelector('[data-sort-current]').dataset;
  if (0 < sortValue.length) {
    params.push(`${sortParam}=${sortValue}`);
  }

  const formData = new FormData(form);
  for (let pair of formData.entries()) {
    let [name, value] = pair;

    name = name.trim();
    value = value.trim();

    if (0 === name.length || 0 === value.length) continue;

    params.push(`${name}=${value}`);
  }

  let link = form.action;

  if (0 < params.length) {
    link += `${urlParams.get('q') ? '&' : '?'}${params.join('&')}`;
  }

  window.location.assign(link);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-filters]');

  if (!button) return true;

  document.querySelector('[data-form-filters] [type="submit"]').click();
});
