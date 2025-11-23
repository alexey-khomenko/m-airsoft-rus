document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-one-click]');

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

  const inputCity = form.querySelector('[name="city"]');
  const valueCity = inputCity.value.trim();

  if (0 === valueCity.length) {
    window.fieldError.add(inputCity);
    errors = true;
  }

  const inputTel = form.querySelector('[name="phone"]');
  const valueTel = inputTel.value.trim();

  if (0 === valueTel.length || valueTel.includes('_')) {
    window.fieldError.add(inputTel);
    errors = true;
  }

  if (errors) return true;


  console.log('POST request to', action);
  console.log('valueName', valueName);
  console.log('valueCity', valueCity);
  console.log('valueTel', valueTel);
  const responseOrderId = 749466;


  window.location.assign(`${form.dataset.finished}?order_id=${responseOrderId}`);
});
