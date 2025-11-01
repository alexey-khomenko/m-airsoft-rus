window.tilePositionJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.tilePositionJsIsLoaded) return true;

  window.tilePositionJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-position-destroy]');

    if (!button) return true;

    const position = button.closest('[data-position-id]');

    position.hidden = true;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-position-remove]');

    if (!button) return true;

    const position = button.closest('[data-position-id]');

    const positionIn = position.querySelector('[data-position-in]');
    const positionOut = position.querySelector('[data-position-out]');

    positionIn.hidden = true;
    positionOut.hidden = false;

    cartRemove(position.dataset.positionId);
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-position-restore]');

    if (!button) return true;

    const position = button.closest('[data-position-id]');

    const input = position.querySelector('[data-position-quantity]');
    const quantity = parseInt(input.value);

    window.cartAdd(position.dataset.productId, quantity);

    const positionIn = position.querySelector('[data-position-in]');
    const positionOut = position.querySelector('[data-position-out]');

    positionOut.hidden = true;
    positionIn.hidden = false;
  });


  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-position-minus]');

    if (!button) return true;

    const position = button.closest('[data-position-id]');

    const input = position.querySelector('[data-position-quantity]');
    const quantity = parseInt(input.value) - 1;
    const quantityMin = 1;

    if (quantityMin > quantity) return true;

    input.value = quantity;

    cartUpdate(position.dataset.positionId, quantity);
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-position-plus]');

    if (!button) return true;

    const position = button.closest('[data-position-id]');

    const input = position.querySelector('[data-position-quantity]');
    const quantity = parseInt(input.value) + 1;
    const quantityMax = +position.dataset.positionQuantityMax;

    if (quantityMax < quantity) return true;

    input.value = quantity;

    cartUpdate(position.dataset.positionId, quantity);
  });

  let updateDebounceTimer;

  document.addEventListener('input', (e) => {
    const input = e.target.closest('[data-position-quantity]');

    if (!input) return true;

    clearTimeout(updateDebounceTimer);

    const position = input.closest('[data-position-id]');

    let quantity = parseInt(input.value);

    const quantityMin = 1;
    const quantityMax = +position.dataset.positionQuantityMax;

    if (quantityMin > quantity) quantity = 1;
    if (quantityMax < quantity) quantity = quantityMax;

    updateDebounceTimer = setTimeout(() => {
      input.value = quantity;

      cartUpdate(position.dataset.positionId, quantity);
    }, 1000);
  });


  function cartRemove(positionId) {
    console.log('cartRemove positionId', positionId);

    updateCartSummary();
  }

  function cartUpdate(positionId, quantity) {
    console.log('cartUpdate positionId', positionId, quantity);

    updateCartSummary();
  }

  function updateCartSummary() {
    const amountDelivery = document.querySelector('[data-amount-delivery]');
    const delivery = amountDelivery ? +amountDelivery.dataset.amountDelivery : 0;


    let newAmountOld = 0;
    let newAmountSale = 0;

    const positions = document.querySelectorAll('[data-position-id]');

    for (const position of positions) {
      if (position.querySelector('[data-position-in]').hidden) continue;

      const price = +position.dataset.positionPrice;
      const priceOld = +position.dataset.positionPriceOld;
      const quantity = +position.querySelector('[data-position-quantity]').value;

      const sumOld = priceOld * quantity;
      const sum = price * quantity;
      const sumSale = sumOld - sum;

      const positionSumOld = position.querySelector('[data-position-sum-old]');
      const positionSum = position.querySelector('[data-position-sum]');
      const positionSumSale = position.querySelector('[data-position-sum-sale]');

      if (positionSumOld) positionSumOld.textContent = sumOld.toLocaleString('ru-RU');
      if (positionSum) positionSum.textContent = sum.toLocaleString('ru-RU');
      if (positionSumSale) positionSumSale.textContent = sumSale.toLocaleString('ru-RU');

      newAmountOld += sumOld;
      newAmountSale += sumSale;
    }

    const newAmountTotal = newAmountOld - newAmountSale + delivery;
    const newBottomOld = newAmountOld + delivery;

    if (0 === newAmountOld) window.location.reload();


    const amountOld = document.querySelector('[data-amount-old]');
    const amountSale = document.querySelector('[data-amount-sale]');
    const amountTotal = document.querySelector('[data-amount-total]');

    const bottomOld = document.querySelector('[data-bottom-old]');
    const bottomTotal = document.querySelector('[data-bottom-total]');

    if (!bottomOld) console.log('Верните <div class="bottom-old"></div>');

    if (amountOld) amountOld.textContent = newAmountOld.toLocaleString('ru-RU');
    if (amountSale) amountSale.textContent = newAmountSale.toLocaleString('ru-RU');
    if (amountTotal) amountTotal.textContent = newAmountTotal.toLocaleString('ru-RU');
    if (bottomOld) bottomOld.textContent = newBottomOld.toLocaleString('ru-RU');
    if (bottomTotal) bottomTotal.textContent = newAmountTotal.toLocaleString('ru-RU');
  }
});
