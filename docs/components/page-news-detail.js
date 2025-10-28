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

  const inputImage = form.querySelector('[name="image"]');
  let file = inputImage.files[0];

  if (file && !file.type.startsWith('image/')) {
    file = undefined;
  }


  if (errors) return true;

  console.log('submit', action);

  console.log('valueName', valueName);
  console.log('valueText', valueText);
  console.log('valueImage', file);

  form.querySelector('[type="submit"]').hidden = true;
});
