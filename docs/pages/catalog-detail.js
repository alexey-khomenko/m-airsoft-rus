window.addEventListener('load', () => {
  const numberOfPhotos = document.querySelectorAll('.swiper-wrapper .img').length;

  if (1 < numberOfPhotos) {
    new Swiper('.photos', {
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
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.buy.button[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    window.cart.add(productId, 1);

    button.closest('.button-buy-wrapper').hidden = true;
  });


  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-favourite-add-product-id]');

    if (!button) return true;

    const productId = button.dataset.favouriteAddProductId;

    window.favourite.add(productId);

    button.hidden = true;

    document.querySelector('[data-favourite-remove-product-id]').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-favourite-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.favouriteRemoveProductId;

    window.favourite.remove(productId);

    button.hidden = true;

    document.querySelector('[data-favourite-add-product-id]').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-comparison-add-product-id]');

    if (!button) return true;

    const productId = button.dataset.comparisonAddProductId;

    window.comparison.add(productId);

    button.hidden = true;

    document.querySelector('[data-comparison-remove-product-id]').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-comparison-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.comparisonRemoveProductId;

    window.comparison.remove(productId);

    button.hidden = true;

    document.querySelector('[data-comparison-add-product-id]').hidden = false;
  });
});
