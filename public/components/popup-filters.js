window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);

  for (let pair of urlParams.entries()) {
    let [name, value] = pair;

    name = name.trim();
    value = value.trim();

    if (0 === name.length || 0 === value.length || 'Y' !== value) continue;

    document.querySelector(`[name="${name}"]`).checked = true;
  }

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form-filters]');

    if (!form) return true;

    e.preventDefault();

    const sort = document.querySelector('[data-sort-current]');
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

    if (!button) return true;

    document.querySelector('[data-form-filters] [type="submit"]').click();
  });
});
