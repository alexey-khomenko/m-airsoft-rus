window.inputTextareaJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.inputTextareaJsIsLoaded) return true;

  window.inputTextareaJsIsLoaded = true;

  console.log('TODO textarea');

  // function textareaFixHeight(textarea) {
  //   textarea.style.height = 'auto';
  //   textarea.style.height = 2 + +textarea.scrollHeight + 'px';
  // }
  //
  // window.addEventListener('load', () => {
  //   const textarea = document.querySelector('[data-form-present] .textarea');
  //
  //   textareaFixHeight(textarea);
  // });
  //
  // window.addEventListener('resize', () => {
  //   const textarea = document.querySelector('[data-form-present] .textarea');
  //
  //   textareaFixHeight(textarea);
  // });
  //
  // document.addEventListener('input', function (e) {
  //   const textarea = e.target.closest('[data-form-present] .textarea');
  //
  //   if (!textarea) return true;
  //
  //   textareaFixHeight(textarea);
  // });
});
