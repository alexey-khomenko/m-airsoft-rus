window.commentNewsJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.commentNewsJsIsLoaded) return true;

  window.commentNewsJsIsLoaded = true;

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-comment-btn-name]');

    if (!button) return true;

    const comment = button.closest('[data-comment-id]');
    const name = comment.querySelector('[data-comment-name]').textContent.trim();

    console.log('comment name', name);

    const textarea = document.querySelector('#text');
    const oldValue = textarea.value.trim();

    textarea.value = 0 < oldValue.length ? `${oldValue}\n${name}, ` : `${name}, `;

    textarea.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-comment-btn-text]');

    if (!button) return true;

    const comment = button.closest('[data-comment-id]');
    const text = comment.querySelector('[data-comment-text]').innerHTML.trim();

    console.log('comment text', text);
  });
});
