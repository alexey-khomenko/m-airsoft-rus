document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-button-logout-to]');

  if (!button) return true;

  console.log('POST request to logout');

  window.location.assign(button.dataset.buttonLogoutTo);
});
