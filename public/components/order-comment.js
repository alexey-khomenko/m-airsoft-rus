window.orderCommentJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.orderCommentJsIsLoaded) return true;

  window.orderCommentJsIsLoaded = true;

  const component = {
    open: document.querySelector('[data-order-comment-form-open]'),
    edit: document.querySelector('[data-order-comment-form-edit]'),
    add: document.querySelector('[data-order-comment-form-add]'),
    close: document.querySelector('[data-order-comment-form-close]'),
    form: document.querySelector('[data-form-order-comment]'),
    output: document.querySelector('[data-order-comment-output]'),
    comment: document.querySelector('[data-info-comment]'),
    openForm: function () {
      if (this.open) this.open.hidden = true;
      if (this.edit) this.edit.hidden = true;
      if (this.add) this.add.hidden = true;
      if (this.close) this.close.hidden = false;
      if (this.form) this.form.hidden = false;
      if (this.output) this.output.hidden = true;
    },
    closeForm: function () {
      const comment = this.comment.textContent.trim();

      const formIsEmpty = 0 === comment.length;

      if (this.open) this.open.hidden = false;
      if (this.edit) this.edit.hidden = formIsEmpty;
      if (this.add) this.add.hidden = !formIsEmpty;
      if (this.close) this.close.hidden = true;
      if (this.form) this.form.hidden = true;
      if (this.output) this.output.hidden = formIsEmpty;
    },
  };

  if (!component.open) console.log('[data-order-comment-form-open] not found');
  if (!component.edit) console.log('[data-order-comment-form-edit] not found');
  if (!component.add) console.log('[data-order-comment-form-add] not found');
  if (!component.close) console.log('[data-order-comment-form-close] not found');
  if (!component.form) console.log('[data-form-order-comment] not found');
  if (!component.output) console.log('[data-order-comment-output] not found');
  if (!component.comment) console.log('[data-info-comment] not found');


  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-order-comment-form-open]');

    if (open) component.openForm();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-order-comment-form-close]');

    if (close) component.closeForm();
  });


  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form-order-comment]');

    if (!form) return true;

    e.preventDefault();

    const action = form.action;
    const input = form.querySelector('[name="comment"]');
    let value = input.value.trim();


    console.log('POST request to', action);
    console.log('comment', value);
    const responseComment = value;


    input.value = responseComment;
    component.comment.textContent = responseComment;

    component.closeForm();
  });
});
