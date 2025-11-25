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
    phone: document.querySelector('[data-info-phone]'),
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
      const phone = this.phone.textContent.trim();
      const email = this.email.textContent.trim();

      const formIsEmpty = 0 === name.length && 0 === phone.length && 0 === email.length;

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
  if (!component.phone) console.log('[data-info-phone] not found');
  if (!component.email) console.log('[data-info-email] not found');


  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-personal-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-personal-form-close]');

    if (close) component.closeForm();
  });


  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-order-personal]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;

    let errors = false;

    const inputPhone = form.querySelector('[name="phone"]');
    const valuePhone = inputPhone.value.trim();

    if (0 === valuePhone.length || valuePhone.includes('_')) {
      window.fieldError.add(inputPhone);
      errors = true;
    }

    const inputLastName = form.querySelector('[name="last-name"]');
    const valueLastName = inputLastName.value.trim();

    if (0 === valueLastName.length) {
      window.fieldError.add(inputLastName);
      errors = true;
    }

    const inputFirstName = form.querySelector('[name="first-name"]');
    const valueFirstName = inputFirstName.value.trim();

    if (0 === valueFirstName.length) {
      window.fieldError.add(inputFirstName);
      errors = true;
    }

    const inputMiddleName = form.querySelector('[name="middle-name"]');
    const valueMiddleName = inputMiddleName.value.trim();

    if (0 === valueMiddleName.length) {
      window.fieldError.add(inputMiddleName);
      errors = true;
    }

    const inputEmail = form.querySelector('[name="email"]');
    const valueEmail = inputEmail.value.trim();

    if (0 === valueEmail.length || !valueEmail.includes('@') || !valueEmail.includes('.')) {
      window.fieldError.add(inputEmail);
      errors = true;
    }

    if (errors) return true;


    console.log('POST request to', action);

    console.log('valuePhone', valuePhone);
    console.log('valueLastName', valueLastName);
    console.log('valueFirstName', valueFirstName);
    console.log('valueMiddleName', valueMiddleName);
    console.log('valueEmail', valueEmail);

    const responsePhone = valuePhone;
    const responseLastName = valueLastName;
    const responseFirstName = valueFirstName;
    const responseMiddleName = valueMiddleName;
    const responseEmail = valueEmail;


    inputPhone.value = responsePhone;
    inputLastName.value = responseLastName;
    inputFirstName.value = responseFirstName;
    inputMiddleName.value = responseMiddleName;
    inputEmail.value = responseEmail;

    component.name.textContent = `${responseLastName} ${responseFirstName} ${responseMiddleName}`;
    component.phone.textContent = responsePhone;
    component.email.textContent = responseEmail;

    component.closeForm();
  });
});
