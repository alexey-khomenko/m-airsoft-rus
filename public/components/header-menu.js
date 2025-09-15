document.addEventListener('click', (e) => {
  const button = e.target.closest('.button-menu-header');

  if (!button) return true;

  e.preventDefault();

  console.log('click', button);
});
