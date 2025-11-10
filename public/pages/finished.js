document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-button-pay]');

  if (!button) return true;


  console.log('pay');
});
