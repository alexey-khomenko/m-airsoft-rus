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
  const newNumber = oldNumber + 1;
  const nextNumber = newNumber + 1;

  console.log('old page number', oldNumber);
  console.log('new page number', newNumber);

  const newPage = document.querySelector(`[data-page-number="${newNumber}"]`);

  if (newPage) newPage.classList.add('current');

  pagination.setAttribute('data-page-current', newNumber);

  const lastPage = document.querySelector('[data-page-last]');
  const nextPage = document.querySelector('[data-page-next]');

  if (newPage === lastPage) {
    showMore.hidden = true;
    nextPage.classList.add('disabled');
  }
  else {
    const url = new URL(nextPage.href);
    url.searchParams.set(pageParam, nextNumber);
    nextPage.href = url.toString();
  }

  const content = document.querySelector('[data-page-items]');


  console.log('POST request to get page', newNumber);
  const testElem = content.querySelector(':scope > div') || content.querySelector(':scope > details');
  const newElem = testElem.cloneNode(true);
  console.log('newElem', testElem);


  content.appendChild(newElem);
});
