window.addEventListener('load', () => {
  const numberOfLargeBanners = document.querySelectorAll('.large-banner').length;

  if (1 < numberOfLargeBanners) {
    new Swiper('.large-banners', {
      direction: 'horizontal',
      loop: true,
      breakpointsBase: 'container',
      breakpoints: {
        268: {
          slidesPerView: 1,
          spaceBetween: 6,
        },
        306: {
          slidesPerView: 1,
          spaceBetween: 7,
        },
        344: {
          slidesPerView: 1,
          spaceBetween: 8,
        },
        415: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
      },
      autoplay: {
        delay: 4000,
      },
    });
  }

  new Swiper('.small-banners', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 4000,
    },
    slidesPerView: 'auto',
    spaceBetween: 8,
  });
});
