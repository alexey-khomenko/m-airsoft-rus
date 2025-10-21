window.removeError = function (input) {
  input.classList.remove('util-input-error');
};

window.addError = function (input) {
  input.classList.add('util-input-error');
};

// TODO tel component ?
window.addEventListener('load', () => {
  const inputs = document.querySelectorAll('[type=tel]');

  for (const input of inputs) {
    const initialCountry = 0 === input.value.length ? 'ru' : 'auto';

    intlTelInput(input, {
      countrySearch: false,
      autoPlaceholder: 'off',
      i18n: {
        'ru': 'Россия',
        'by': 'Беларусь',
        'kz': 'Казахстан',
        'kg': 'Кыргызстан',
        'am': 'Армения',
        'ua': 'Украина',
      },
      onlyCountries: [
        'ru', 'by', 'kz', 'kg', 'am', 'ua',
      ],
      countryOrder: [
        'ru', 'by', 'kz', 'kg', 'am', 'ua',
      ],
      initialCountry,
    });

    setTelMask(input);

    input.addEventListener('countrychange', (e) => {
      const input = e.target;

      input.setAttribute('value', '');
      input.value = '';

      setTelMask(input);
    });
  }

  function getTelMask(countryCode) {
    let mask, placeholder;

    mask = '+7(999)999-99-99';
    placeholder = '+7(___)___-__-__';

    switch (countryCode) {
      case 'by':
        mask = '+375(99)999-99-99';
        placeholder = '+375(__)___-__-__';
        break;
      case 'kz':
        mask = '+7(999)999-99-99';
        placeholder = '+7(___)___-__-__';
        break;
      case 'kg':
        mask = '+\\9\\96(999)999-999';
        placeholder = '+996(___)___-___';
        break;
      case 'am':
        mask = '+374(99)99-99-99';
        placeholder = '+374(__)__-__-__';
        break;
      case 'ua':
        mask = '+380(99)999-99-99';
        placeholder = '+380(__)___-__-__';
        break;
    }

    return {mask, placeholder};
  }

  function setTelMask(input) {
    setTimeout(() => {
      const country = input.parentNode.querySelector('.iti__selected-country .iti__flag');

      const countryCode = country ? country.getAttribute('class').slice(15) : 'ru';

      const {mask, placeholder} = getTelMask(countryCode);

      input.placeholder = placeholder;

      Inputmask.remove(input);
      Inputmask(mask).mask(input);
    }, 10);
  }
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-cart-add]');

  if (!button) return true;

  const productId = button.dataset.cartAdd;

  const cart = document.querySelector('[data-cart-number]');

  let cartNumber = +cart.dataset.cartNumber;

  cart.setAttribute('data-cart-number', ++cartNumber);

  console.log('cartAdd', productId, cartNumber);
});
