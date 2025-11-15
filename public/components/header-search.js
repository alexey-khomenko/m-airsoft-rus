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
  show: function () {
    window.closePopup();

    window.fieldError.remove(search.fake);
    window.fieldError.remove(search.popup);
    window.fieldError.remove(search.wrapper);

    search.backdrop.hidden = false;
    search.popup.hidden = false;
    search.form.classList.add('open');
  },
  hide: function () {
    if (!search.form.classList.contains('open')) return;

    window.fieldError.remove(search.fake);
    window.fieldError.remove(search.popup);
    window.fieldError.remove(search.wrapper);

    search.backdrop.hidden = true;
    search.popup.hidden = true;
    search.form.classList.remove('open');
  },
};

document.addEventListener('focusin', (e) => {
  const input = e.target.closest('[data-form-search] [name="search"]');

  if (input) search.show();
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-search]');

  if (!form) return true;

  e.preventDefault();

  const action = search.form.action;
  const value = search.input.value.trim();

  if (search.limit > value.length) {
    window.fieldError.add(search.fake);
    window.fieldError.add(search.popup);
    window.fieldError.add(search.wrapper);
    return true;
  }

  window.location.assign(`${action}?q=${value}`);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-submit-form-search]');

  if (button) search.form.querySelector('[type="submit"]').click();
});

document.addEventListener('click', (e) => {
  const form = e.target.closest('[data-form-search]');
  const popup = e.target.closest('.header-search-popup');

  if (form || popup) return true;

  search.hide();
});

document.addEventListener('keydown', (e) => {
  if ('Escape' !== e.key) return true;

  search.hide();
  search.input.blur();
});


const testElems = search.results.innerHTML;
search.results.innerHTML = '';


document.addEventListener('input', (e) => {
  const input = e.target.closest('[data-form-search] [name="search"]');

  if (!input) return true;

  clearTimeout(search.debounceTimer);

  search.results.hidden = true;

  window.fieldError.remove(search.fake);
  window.fieldError.remove(search.popup);
  window.fieldError.remove(search.wrapper);

  const value = search.input.value.trim();

  if (search.limit > value.length) return true;

  search.results.innerHTML = '';

  search.debounceTimer = setTimeout(() => {

    console.log('POST request to search', value);
    search.results.innerHTML = testElems;


    search.results.hidden = false;
  }, 1000);
});
