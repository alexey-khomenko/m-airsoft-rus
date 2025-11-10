let isLoaded = false;
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  if (!isLoaded) {
    isLoaded = true;
    return true;
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  document.querySelector('.header').hidden = scrollTop > lastScrollTop && scrollTop > 100;

  lastScrollTop = 0 < scrollTop ? scrollTop : 0;
});
