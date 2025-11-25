window.orderBonusesJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderBonusesJsIsLoaded) return true;

  window.orderBonusesJsIsLoaded = true;

  const component = {
    open: document.querySelector('[data-order-bonuses-form-open]'),
    close: document.querySelector('[data-order-bonuses-form-close]'),
    form: document.querySelector('[data-form-order-bonuses]'),
    output: document.querySelector('[data-order-bonuses-output]'),
    bonuses: document.querySelector('[data-info-bonuses]'),
    balance: document.querySelector('[data-info-balance]'),
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.form) this.form.hidden = false;
      if (this.output) this.output.hidden = true;
    },
    closeForm: function () {
      const bonuses = +this.bonuses.dataset.infoBonuses;

      const formIsEmpty = 0 === bonuses;

      if (this.open) this.open.hidden = false;
      if (this.close) this.close.hidden = true;
      if (this.form) this.form.hidden = true;
      if (this.output) this.output.hidden = formIsEmpty;
    },
  };

  if (!component.open) console.log('[data-order-bonuses-form-open] not found');
  if (!component.close) console.log('[data-order-bonuses-form-close] not found');
  if (!component.form) console.log('[data-form-order-bonuses] not found');
  if (!component.output) console.log('[data-order-bonuses-output] not found');
  if (!component.bonuses) console.log('[data-info-bonuses] not found');
  if (!component.balance) console.log('[data-info-balance] not found');


  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-bonuses-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-bonuses-form-close]');

    if (close) component.closeForm();
  });


  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-order-bonuses]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const input = form.querySelector('[name="bonuses"]');
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    let value = parseInt(input.value);

    if (isNaN(value)) value = 0;
    if (value < min) value = min;
    if (value > max) value = max;


    console.log('POST request to', action);
    console.log('bonuses', value);
    const responseBonuses = value;


    input.value = responseBonuses;
    component.bonuses.textContent = responseBonuses.toLocaleString('ru-RU');
    component.bonuses.setAttribute('data-info-bonuses', responseBonuses);

    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true}));
    component.closeForm();
  });
});
