document.addEventListener('click', (e) => {
  const button = e.target.closest('.button-menu-footer');

  if (!button) return true;

  e.preventDefault();

  console.log('click', button);
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('.button-login-footer');

  if (!button) return true;

  e.preventDefault();

  console.log('click', button);
});
