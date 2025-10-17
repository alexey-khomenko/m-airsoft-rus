window.sectionPaginationJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.sectionPaginationJsIsLoaded) return true;

  window.sectionPaginationJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const linkA = e.target.closest('.section-pagination .page.disabled');
    const linkB = e.target.closest('.section-pagination .page.current');

    if (linkA || linkB) e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.section-pagination .show-more');

    if (!button) return true;

    console.log(button);
  });
});
