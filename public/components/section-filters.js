document.addEventListener('click', (e) => {

  const dropdown = e.target.closest('.sort-dropdown');

  if (dropdown) return true;

  const sort = document.querySelector('.sort-dropdown');

  if (!sort) return true;

  sort.open = false;
});
