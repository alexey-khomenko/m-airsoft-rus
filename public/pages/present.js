document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form-present]');

  if (!form) return true;

  e.preventDefault();

  console.log('submit');
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
