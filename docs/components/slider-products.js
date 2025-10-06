window.sliderProductsJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.sliderProductsJsIsLoaded) return true;

  window.sliderProductsJsIsLoaded = true;

  const sliders = document.querySelectorAll('.slider-products .tiles');

  for (const slider of sliders) {
    new Swiper(slider, {
      direction: 'horizontal',
      loop: false,
      breakpointsBase: 'container',
      breakpoints: {
        268: {
          slidesPerView: 2,
          spaceBetween: 6,
          grid: {rows: 2},
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 7,
          grid: {rows: 2},
        },
        360: {
          slidesPerView: 2,
          spaceBetween: 8,
          grid: {rows: 2},
        },
        520: {
          slidesPerView: 3,
          spaceBetween: 8,
          grid: {rows: 2},
        },
        696: {
          slidesPerView: 4,
          spaceBetween: 8,
          grid: {rows: 2},
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
});
