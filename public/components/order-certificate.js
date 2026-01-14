window.orderCertificateJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderCertificateJsIsLoaded) return true;

  window.orderCertificateJsIsLoaded = true;

  const component = {
    open: document.querySelector('[data-order-certificate-form-open]'),
    edit: document.querySelector('[data-order-certificate-form-edit]'),
    add: document.querySelector('[data-order-certificate-form-add]'),
    close: document.querySelector('[data-order-certificate-form-close]'),
    form: document.querySelector('[data-form-order-certificate]'),
    output: document.querySelector('[data-order-certificate-output]'),
    certificate: document.querySelector('[data-info-certificate]'),
    update: function (info) {
      // TODO: валидация info - 1 поле
      const {certificate} = info;

      if (this.certificate) {
        this.certificate.textContent = certificate.toLocaleString('ru-RU');
        this.certificate.setAttribute('data-info-certificate', certificate);
      }

      if (this.output) this.output.hidden = this.isOpen || 0 === certificate.length;

      const input = this.form.querySelector('[name="certificate"]');

      if (input) input.value = certificate;
    },
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.edit) this.edit.hidden = true;
      if (this.add) this.add.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.form) this.form.hidden = false;
      if (this.output) this.output.hidden = true;

      this.isOpen = true;
    },
    closeForm: function () {
      const certificate = this.certificate.textContent.trim();

      const formIsEmpty = 0 === certificate.length;

      if (this.open) this.open.hidden = false;
      if (this.edit) this.edit.hidden = formIsEmpty;
      if (this.add) this.add.hidden = !formIsEmpty;
      if (this.close) this.close.hidden = true;
      if (this.form) this.form.hidden = true;
      if (this.output) this.output.hidden = formIsEmpty;

      this.isOpen = false;
    },
    isOpen: false,
  };

  if (!component.open) console.log('[data-order-certificate-form-open] not found');
  if (!component.edit) console.log('[data-order-certificate-form-edit] not found');
  if (!component.add) console.log('[data-order-certificate-form-add] not found');
  if (!component.close) console.log('[data-order-certificate-form-close] not found');
  if (!component.form) console.log('[data-form-order-certificate] not found');
  if (!component.output) console.log('[data-order-certificate-output] not found');
  if (!component.certificate) console.log('[data-info-certificate] not found');


  document.addEventListener('updateOrderInfo', async (e) => {
    component.update(e.detail);
  });

  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-certificate-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-certificate-form-close]');

    if (close) component.closeForm();
  });


  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-order-certificate]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const input = form.querySelector('[name="certificate"]');
    const value = input.value.trim();

    form.dispatchEvent(new CustomEvent('orderRequestSent', {bubbles: true}));


    await new Promise(r => setTimeout(r, 3000));
    console.log('POST request to', action);
    console.log('certificate', value);

    const response = {
      'certificate': value,
      'info': {
        certificate: value,
        balance: 940,
        bonuses: 10,
        old: 8501,
        discount: 3001,
        delivery: 301,
        total: 15031,
      },
    };


    input.value = response.certificate;
    component.certificate.textContent = response.certificate;

    component.closeForm();

    form.dispatchEvent(new CustomEvent('updateOrderInfo', {bubbles: true, detail: response.info}));
    form.dispatchEvent(new CustomEvent('orderRequestReceived', {bubbles: true}));
  });
});
