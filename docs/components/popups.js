document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-open]');

  if (!button) return true;

  const name = button.dataset.popupOpen;

  const backdrop = document.querySelector('[data-popup-backdrop]');
  const popup = document.querySelector(`[data-popup-name="${name}"]`);

  if (!popup || !backdrop) return true;

  const popups = document.querySelectorAll('[data-popup-name]:not([hidden])');

  for (const current of popups) {
    current.hidden = true;
  }

  backdrop.hidden = false;
  popup.hidden = false;
});

window.closePopup = function () {
  const backdrop = document.querySelector('[data-popup-backdrop]');

  if (!backdrop) return true;

  const popups = document.querySelectorAll('[data-popup-name]:not([hidden])');

  for (const current of popups) {
    current.hidden = true;
  }

  backdrop.hidden = true;
}

document.addEventListener('click', (e) => {
  const backdrop = e.target.closest('[data-popup-backdrop]');
  const popup = e.target.closest('[data-popup-name]');

  if (!backdrop || popup) return true;

  window.closePopup();
});

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-popup-close]');

  if (!button) return true;

  window.closePopup();
});

document.addEventListener('keydown', function (e) {
  if ('Escape' !== e.key) return true;

  window.closePopup();
});
