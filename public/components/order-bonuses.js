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
    update: function (amount) {
      const {balance, bonuses} = amount;

      if (this.bonuses) {
        this.form.querySelector('[name="bonuses"]').value = bonuses;
        this.bonuses.textContent = bonuses.toLocaleString('ru-RU');
        this.bonuses.setAttribute('data-info-bonuses', bonuses);
      }

      if (this.balance) {
        this.balance.textContent = balance.toLocaleString('ru-RU');
        this.balance.setAttribute('data-info-balance', balance);
      }
    },
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


  document.addEventListener('updateOrderInfo', async (e) => {
    component.update(e.detail);
  });

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

    const response = {
      'bonuses': value,
      'info': {
        balance: 940,
        bonuses: 10,
        old: 8501,
        discount: 3001,
        delivery: 301,
        total: 15031,
      },
    };


    input.value = response.bonuses;
    component.bonuses.textContent = response.bonuses.toLocaleString('ru-RU');
    component.bonuses.setAttribute('data-info-bonuses', response.bonuses);

    component.closeForm();

    form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
  });
});
