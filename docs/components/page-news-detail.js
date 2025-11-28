document.addEventListener('submit', async (e) => {
  const form = e.target.closest('[data-form-comment]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;

  let errors = false;

  const inputName = form.querySelector('[name="name"]');
  const valueName = inputName.value.trim();

  if (0 === valueName.length) {
    window.fieldError.add(inputName);
    errors = true;
  }

  const inputText = form.querySelector('[name="text"]');
  const valueText = inputText.value.trim();

  if (0 === valueText.length) {
    window.fieldError.add(inputText);
    errors = true;
  }

  if (errors) return true;


  console.log('POST request to', action);
  console.log('valueName', valueName);
  console.log('valueText', valueText);


  form.querySelector('[type="submit"]').hidden = true;
});
