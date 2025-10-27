document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-present]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;

  let errors = false;


  const inputSenderName = form.querySelector('[name="sender-name"]');
  const valueSenderName = inputSenderName.value.trim();

  if (0 === valueSenderName.length) {
    window.fieldErrorAdd(inputSenderName);
    errors = true;
  }

  const inputRecipientName = form.querySelector('[name="recipient-name"]');
  const valueRecipientName = inputRecipientName.value.trim();

  if (0 === valueRecipientName.length) {
    window.fieldErrorAdd(inputRecipientName);
    errors = true;
  }


  const inputSenderEmail = form.querySelector('[name="sender-email"]');
  const valueSenderEmail = inputSenderEmail.value.trim();

  if (0 === valueSenderEmail.length || !valueSenderEmail.includes('@') || !valueSenderEmail.includes('.')) {
    window.fieldErrorAdd(inputSenderEmail);
    errors = true;
  }

  const inputRecipientEmail = form.querySelector('[name="recipient-email"]');
  const valueRecipientEmail = inputRecipientEmail.value.trim();

  if (0 === valueRecipientEmail.length || !valueRecipientEmail.includes('@') || !valueRecipientEmail.includes('.')) {
    window.fieldErrorAdd(inputRecipientEmail);
    errors = true;
  }


  const inputSenderPhone = form.querySelector('[name="sender-phone"]');
  const valueSenderPhone = inputSenderPhone.value.trim();

  if (0 === valueSenderPhone.length || valueSenderPhone.includes('_')) {
    window.fieldErrorAdd(inputSenderPhone);
    errors = true;
  }

  const inputRecipientPhone = form.querySelector('[name="recipient-phone"]');
  const valueRecipientPhone = inputRecipientPhone.value.trim();

  if (0 === valueRecipientPhone.length || valueRecipientPhone.includes('_')) {
    window.fieldErrorAdd(inputRecipientPhone);
    errors = true;
  }


  const inputPresentSum = form.querySelector('[name="present-sum"]');
  const valuePresentSum = inputPresentSum.value.trim();

  if (0 === valuePresentSum.length) {
    errors = true;
  }


  const inputPresentText = form.querySelector('[name="present-text"]');
  const valuePresentText = inputPresentText.value.trim();

  if (0 === valuePresentText.length) {
    window.fieldErrorAdd(inputPresentText);
    errors = true;
  }


  if (errors) return true;

  console.log('submit', action);

  console.log('valueSenderName', valueSenderName);
  console.log('valueRecipientName', valueRecipientName);

  console.log('valueSenderEmail', valueSenderEmail);
  console.log('valueRecipientEmail', valueRecipientEmail);

  console.log('valueSenderPhone', valueSenderPhone);
  console.log('valueRecipientPhone', valueRecipientPhone);

  console.log('valuePresentSum', valuePresentSum);
  console.log('valuePresentText', valuePresentText);

  form.querySelector('[type="submit"]').hidden = true;
});


function textareaFixHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = 2 + +textarea.scrollHeight + 'px';
}

window.addEventListener('load', () => {
  const textarea = document.querySelector('[data-form-present] .textarea');

  textareaFixHeight(textarea);
});

window.addEventListener('resize', () => {
  const textarea = document.querySelector('[data-form-present] .textarea');

  textareaFixHeight(textarea);
});

document.addEventListener('input', function (e) {
  const textarea = e.target.closest('[data-form-present] .textarea');

  if (!textarea) return true;

  textareaFixHeight(textarea);
});
