document.addEventListener('click', (e) => {
  const linkA = e.target.closest('.section-pagination .page.disabled');
  const linkB = e.target.closest('.section-pagination .page.current');

  if (linkA || linkB) e.preventDefault();
});

document.addEventListener('click', (e) => {
  const showMore = e.target.closest('.show-more');

  if (!showMore) return true;

  const pagination = document.querySelector('.section-pagination');

  const {pageParam, pageCurrent} = pagination.dataset;

  const oldNumber = +pageCurrent;

  console.log(oldNumber);

  const newPage = document.querySelector(`[data-page-number="${oldNumber + 1}"]`);

  if (newPage) newPage.classList.add('current');

  pagination.setAttribute('data-page-current', oldNumber + 1);

  const lastPage = document.querySelector('[data-page-last]');
  const nextPage = document.querySelector('[data-page-next]');

  if (newPage === lastPage) {
    showMore.hidden = true;
    nextPage.classList.add('disabled');
  }
  else {
    const url = new URL(nextPage.href);
    url.searchParams.set(pageParam, oldNumber + 2);
    nextPage.href = url.toString();
  }

  const content = document.querySelector('[data-page-items]');

  const testElem = content.querySelector(':scope > div');
  const newElem = testElem.cloneNode(true);
  console.log('newElem', testElem);

  content.appendChild(newElem);
});
