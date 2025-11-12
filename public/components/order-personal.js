window.orderPersonalJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderPersonalJsIsLoaded) return true;

  window.orderPersonalJsIsLoaded = true;

  const component = {
    open: document.querySelector('[data-order-personal-form-open]'),
    edit: document.querySelector('[data-order-personal-form-edit]'),
    add: document.querySelector('[data-order-personal-form-add]'),
    close: document.querySelector('[data-order-personal-form-close]'),
    form: document.querySelector('[data-form-order-personal]'),
    output: document.querySelector('[data-order-personal-output]'),
    name: document.querySelector('[data-info-name]'),
    tel: document.querySelector('[data-info-tel]'),
    email: document.querySelector('[data-info-email]'),
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.edit) this.edit.hidden = true;
      if (this.add) this.add.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.form) this.form.hidden = false;
      if (this.output) this.output.hidden = true;
    },
    closeForm: function () {
      const name = this.name.textContent.trim();
      const tel = this.tel.textContent.trim();
      const email = this.email.textContent.trim();

      const formIsEmpty = 0 === name.length && 0 === tel.length && 0 === email.length;

      if (this.open) this.open.hidden = false;
      if (this.edit) this.edit.hidden = formIsEmpty;
      if (this.add) this.add.hidden = !formIsEmpty;
      if (this.close) this.close.hidden = true;
      if (this.form) this.form.hidden = true;
      if (this.output) this.output.hidden = formIsEmpty;
    },
  };

  if (!component.open) console.log('[data-order-personal-form-open] not found');
  if (!component.edit) console.log('[data-order-personal-form-edit] not found');
  if (!component.add) console.log('[data-order-personal-form-add] not found');
  if (!component.close) console.log('[data-order-personal-form-close] not found');
  if (!component.form) console.log('[data-form-order-personal] not found');
  if (!component.output) console.log('[data-order-personal-output] not found');
  if (!component.name) console.log('[data-info-name] not found');
  if (!component.tel) console.log('[data-info-tel] not found');
  if (!component.email) console.log('[data-info-email] not found');


  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-personal-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-personal-form-close]');

    if (close) component.closeForm();
  });


  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form-order-personal]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;


    console.log('POST request to', action);
    component.name.textContent = '';
    component.tel.textContent = '';
    component.email.textContent = '';


    component.closeForm();
  });
});
