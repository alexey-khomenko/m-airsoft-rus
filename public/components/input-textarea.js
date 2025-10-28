window.inputTextareaJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.inputTextareaJsIsLoaded) return true;

  window.inputTextareaJsIsLoaded = true;

  const textareaAll = document.querySelectorAll('.textarea');

  for (const textarea of textareaAll) {
    textareaFixHeight(textarea);
  }

  window.addEventListener('resize', () => {
    for (const textarea of textareaAll) {
      textareaFixHeight(textarea);
    }
  });

  document.addEventListener('input', function (e) {
    const textarea = e.target.closest('.textarea');

    if (textarea) textareaFixHeight(textarea);
  });

  function textareaFixHeight(textarea) {
    const textareaFake = textarea.nextElementSibling;

    textareaFake.value = textarea.value;

    textarea.style.height = `${2 + +textareaFake.scrollHeight}px`;
  }
});
