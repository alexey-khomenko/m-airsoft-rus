window.sliderNewsJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.sliderNewsJsIsLoaded) return true;

  window.sliderNewsJsIsLoaded = true;

  const sliders = document.querySelectorAll('.slider-news .items');

  for (const slider of sliders) {
    new Swiper(slider, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 20,
    });
  }
});
