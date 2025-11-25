document.addEventListener('submit', async (e) => {
  const form = e.target.closest('[data-form-profile-name]');

  if (!form) return true;

  e.preventDefault();

  const action = form.action;

  let errors = false;

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
  console.log('valueLastName', valueLastName);
  console.log('valueFirstName', valueFirstName);
  console.log('valueMiddleName', valueMiddleName);
  console.log('valueEmail', valueEmail);


  window.location.reload();
});
