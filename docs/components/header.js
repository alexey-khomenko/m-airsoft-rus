let isLoaded = false;
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  if (!isLoaded) {
    isLoaded = true;
    return true;
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  header.hidden = scrollTop > lastScrollTop && scrollTop > 100;

  lastScrollTop = 0 < scrollTop ? scrollTop : 0;
});
