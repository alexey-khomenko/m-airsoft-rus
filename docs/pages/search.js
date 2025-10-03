window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);

  document.querySelector('[data-form-search] [name="search"]').value = urlParams.get('q');
});
