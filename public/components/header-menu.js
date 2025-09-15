document.addEventListener('click', (e) => {
  const button = e.target.closest('.header-menu .button');

  if (!button) return true;

  e.preventDefault();

  console.log('click', button);
});
