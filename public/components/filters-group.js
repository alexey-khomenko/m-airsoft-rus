window.filtersGroupJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.filtersGroupJsIsLoaded) return true;

  window.filtersGroupJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const buttonShow = e.target.closest('[data-filters-group-show]');

    if (!buttonShow) return true;

    buttonShow.hidden = true;

    const group = buttonShow.closest('[data-filters-group]');

    group.querySelector('[data-filters-group-hide]').hidden = false;
    group.querySelector('.second-group').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const buttonHide = e.target.closest('[data-filters-group-hide]');

    if (!buttonHide) return true;

    buttonHide.hidden = true;

    const group = buttonHide.closest('[data-filters-group]');

    group.querySelector('[data-filters-group-show]').hidden = false;
    group.querySelector('.second-group').hidden = true;
  });
});
