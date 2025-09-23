function initApp() {
  const placeholder = '+7(___)___-__-__';
  const mask = '+7(999)999-99-99';

  const selectors = document.querySelectorAll('[type=tel]');
  const im = new Inputmask(mask);

  for (const selector of selectors) {
    selector.placeholder = placeholder;
    im.mask(selector);
  }
}

console.log('document.readyState', document.readyState);

if ('complete' === document.readyState) {
  initApp();
}
else {
  document.addEventListener('DOMContentLoaded', initApp);
}
