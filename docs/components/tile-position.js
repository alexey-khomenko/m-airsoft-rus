window.tilePositionJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tilePositionJsIsLoaded) return true;

  window.tilePositionJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('TODO');

    if (!button) return true;

  });
});
