const search = {
  backdrop: document.querySelector('[data-popup-backdrop]'),
  fake: document.querySelector('.header-search-fake'),
  popup: document.querySelector('.header-search-popup'),
  wrapper: document.querySelector('.header-search-results-wrapper'),
  results: document.querySelector('.header-search-results'),
  form: document.querySelector('[data-form-search]'),
  input: document.querySelector('[data-form-search] [name="search"]'),
  limit: 3,
  debounceTimer: null,
};

function showHeaderSearchPopup() {
  window.closePopup();

  window.removeError(search.fake);
  window.removeError(search.popup);
  window.removeError(search.wrapper);

  search.backdrop.hidden = false;
  search.popup.hidden = false;
  search.form.classList.add('open');
}

function hideHeaderSearchPopup() {
  if (!search.form.classList.contains('open')) return;

  window.removeError(search.fake);
  window.removeError(search.popup);
  window.removeError(search.wrapper);

  search.backdrop.hidden = true;
  search.popup.hidden = true;
  search.form.classList.remove('open');
}

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-search] [name="search"]');

  if (!input) return true;

  showHeaderSearchPopup();
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-search]');

  if (!form) return true;

  e.preventDefault();

  const action = search.form.action;
  const value = search.input.value.trim();

  if (search.limit > value.length) {
    window.addError(search.fake);
    window.addError(search.popup);
    window.addError(search.wrapper);
    return true;
  }

  window.location.assign(`${action}?q=${value}`);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-search]');

  if (!button) return true;

  search.form.querySelector('[type="submit"]').click();
});

document.addEventListener('click', (e) => {
  const form = e.target.closest('[data-form-search]');
  const popup = e.target.closest('.header-search-popup');

  if (form || popup) return true;

  hideHeaderSearchPopup();
});

document.addEventListener('keydown', function (e) {
  if ('Escape' !== e.key) return true;

  hideHeaderSearchPopup();
  search.input.blur();
});

document.addEventListener('input', (e) => {
  const input = e.target.closest('[data-form-search] [name="search"]');

  if (!input) return true;

  clearTimeout(search.debounceTimer);

  search.results.hidden = true;

  window.removeError(search.fake);
  window.removeError(search.popup);
  window.removeError(search.wrapper);

  const value = search.input.value.trim();

  if (search.limit > value.length) return;

  search.debounceTimer = setTimeout(() => {

    console.log('request', value);

    search.results.hidden = false;
  }, 1000);
});
