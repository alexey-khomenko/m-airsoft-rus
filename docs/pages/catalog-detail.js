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

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('.button-buy-wrapper .button[data-cart-add]');

    if (!button) return true;

    const productId = button.dataset.cartAdd;

    const size = document.querySelector('[data-form-sizes] [name="size"]:checked');
    const offerId = parseInt(size.value);

    await window.cart.add(productId, 1, offerId);

    button.closest('.button-buy-wrapper').hidden = true;
  });


  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-favourite-add-product-id]');

    if (!button) return true;

    const productId = button.dataset.favouriteAddProductId;

    await window.favourite.add(productId);

    button.hidden = true;

    document.querySelector('[data-favourite-remove-product-id]').hidden = false;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-favourite-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.favouriteRemoveProductId;

    await window.favourite.remove(productId);

    button.hidden = true;

    document.querySelector('[data-favourite-add-product-id]').hidden = false;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-comparison-add-product-id]');

    if (!button) return true;

    const productId = button.dataset.comparisonAddProductId;

    await window.comparison.add(productId);

    button.hidden = true;

    document.querySelector('[data-comparison-remove-product-id]').hidden = false;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-comparison-remove-product-id]');

    if (!button) return true;

    const productId = button.dataset.comparisonRemoveProductId;

    await window.comparison.remove(productId);

    button.hidden = true;

    document.querySelector('[data-comparison-add-product-id]').hidden = false;
  });


  async function getAvailability() {
    const form = document.querySelector('[data-form-sizes]');
    const action = form.action;
    const input = form.querySelector('[name="size"]:checked');
    const value = parseInt(input.value);


    console.log('POST request to', action);
    console.log('size', value);

    const result = {
      availability: 'Есть в наличии',
      stores: [
        {
          address: 'Ленинградский проспект, 2',
          remnant: 'остаток: много',
        },
        {
          address: 'Фрунзенская набережная, 16к1',
          remnant: 'остаток: достаточно',
        },
        {
          address: '3я Парковая, 33',
          remnant: 'остаток: мало',
        },
      ],
    };


    document.querySelector('[data-availability]').textContent = result.availability;
    document.querySelector('.stores-main').innerHTML = result.stores.map(({address, remnant}) => {
      return `<div class="row">
        <img src="./images/catalog-detail-store.png" alt="" class="img" decoding="async" loading="lazy"/>
        <div>
          <div class="address">${address}</div>
          <div class="remnant">${remnant}</div>
        </div>
      </div>`;
    }).join('');
  }

  document.addEventListener('input', async (e) => {
    const input = e.target.closest('[data-form-sizes] [name="size"]');

    if (input) await getAvailability();
  });

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-sizes]');

    if (!form) return true;

    e.preventDefault();

    await getAvailability();
  });


  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-inner-spoiler-show]');

    if (!button) return true;

    button.hidden = true;

    const parent = button.closest('.spoiler-main');
    parent.querySelector('.inner-spoiler-wrapper').classList.remove('closed');
    parent.querySelector('[data-inner-spoiler-hide]').hidden = false;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-inner-spoiler-hide]');

    if (!button) return true;

    button.hidden = true;

    const parent = button.closest('.spoiler-main');
    parent.querySelector('.inner-spoiler-wrapper').classList.add('closed');
    parent.querySelector('[data-inner-spoiler-show]').hidden = false;
  });


  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-comment]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;

    let errors = false;

    const inputProductId = form.querySelector('[name="product-id"]');
    const valueProductId = inputProductId.value.trim();

    const inputName = form.querySelector('[name="name"]');
    const valueName = inputName.value.trim();

    if (0 === valueName.length) {
      window.fieldError.add(inputName);
      errors = true;
    }

    let valueText = '';

    const inputTextReview = form.querySelector('[name="review-text"]');
    if (inputTextReview) {
      valueText = inputTextReview.value.trim();

      if (0 === valueText.length) {
        window.fieldError.add(inputTextReview);
        errors = true;
      }
    }

    const inputTextQuestion = form.querySelector('[name="question-text"]');
    if (inputTextQuestion) {
      valueText = inputTextQuestion.value.trim();

      if (0 === valueText.length) {
        window.fieldError.add(inputTextQuestion);
        errors = true;
      }
    }

    if (errors) return true;


    console.log('POST request to', action);
    console.log('valueProductId', valueProductId);
    console.log('valueName', valueName);
    console.log('valueText', valueText);


    if (inputTextReview) inputTextReview.value = '';
    if (inputTextQuestion) inputTextQuestion.value = '';

    window.location.reload();
  });
});
