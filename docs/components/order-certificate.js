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
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.edit) this.edit.hidden = true;
      if (this.add) this.add.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.form) this.form.hidden = false;
      if (this.output) this.output.hidden = true;
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
    },
  };

  if (!component.open) console.log('[data-order-certificate-form-open] not found');
  if (!component.edit) console.log('[data-order-certificate-form-edit] not found');
  if (!component.add) console.log('[data-order-certificate-form-add] not found');
  if (!component.close) console.log('[data-order-certificate-form-close] not found');
  if (!component.form) console.log('[data-form-order-certificate] not found');
  if (!component.output) console.log('[data-order-certificate-output] not found');
  if (!component.certificate) console.log('[data-info-certificate] not found');


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


    console.log('POST request to', action);
    console.log('certificate', value);
    const responseCertificate = value;


    input.value = responseCertificate;
    component.certificate.textContent = responseCertificate;

    form.dispatchEvent(new CustomEvent('checkOrderSummary', {bubbles: true}));
    component.closeForm();
  });
});
