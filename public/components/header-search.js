const search = {
  backdrop: document.querySelector('[data-popup-backdrop]'),
  fake: document.querySelector('.header-search-fake'),
  wrapper: document.querySelector('.header-search-results-wrapper'),
  results: document.querySelector('.header-search-results'),
  form: document.querySelector('[data-form-search]'),
  submit: document.querySelector('[data-form-search] [type="submit"]'),
};

function showHeaderSearchResults() {
  window.closePopup();

  window.removeError(search.fake);
  window.removeError(search.wrapper);
  window.removeError(search.results);

  search.backdrop.hidden = false;
  search.wrapper.hidden = false;
  search.form.classList.add('open');
}

function hideHeaderSearchResults() {
  window.removeError(search.fake);
  window.removeError(search.wrapper);
  window.removeError(search.results);

  search.backdrop.hidden = true;
  search.wrapper.hidden = true;
  search.form.classList.remove('open');
}

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-search] [name="search"]');

  if (!input) return true;

  showHeaderSearchResults();
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-search]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;
  const input = form.querySelector('[name="search"]');
  const value = input.value.trim();

  if (3 > value.length) {
    window.addError(search.fake);
    window.addError(search.wrapper);
    window.addError(search.results);
    return true;
  }

  window.location.assign(`${action}?q=${value}`);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-search]');

  if (!button) return true;

  search.submit.click();
});

document.addEventListener('click', (e) => {
  const form = e.target.closest('[data-form-search]');
  const results = e.target.closest('.header-search-results-wrapper');

  if (form || results) return true;

  if (search.form.classList.contains('open')) hideHeaderSearchResults();
});
