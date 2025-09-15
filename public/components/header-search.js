document.addEventListener('submit', (e) => {
  const form = e.target.closest('.header-search');

  if (!form) return true;

  e.preventDefault();

  console.log('submit', form);
});
