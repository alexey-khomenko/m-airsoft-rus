console.log('PageNewsDetail');

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-comment]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;

  let errors = false;


  const inputName = form.querySelector('[name="name"]');
  const valueName = inputName.value.trim();

  if (0 === valueName.length) {
    window.fieldErrorAdd(inputName);
    errors = true;
  }

  const inputText = form.querySelector('[name="text"]');
  const valueText = inputText.value.trim();

  if (0 === valueText.length) {
    window.fieldErrorAdd(inputText);
    errors = true;
  }


  // TODO [name="image"] type files images


  if (errors) return true;

  console.log('submit', action);

  console.log('valueName', valueName);
  console.log('valueText', valueText);

  form.querySelector('[type="submit"]').hidden = true;
});
