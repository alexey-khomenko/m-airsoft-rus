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

  new Swiper('.section-reviews .items', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
  });

  const productGroups = document.querySelectorAll('.section-products .tiles');

  for (const productGroup of productGroups) {
    new Swiper(productGroup, {
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
