window.popupMenuHeaderJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.popupMenuHeaderJsIsLoaded) return true;

  window.popupMenuHeaderJsIsLoaded = true;

  const buttonClose = document.querySelector('.popup-menu-header [data-submenu-close]');
  const popup = buttonClose.closest('[data-popup-name="menu-header"]');
  const popupHeader = popup.querySelector('.type-popup');
  const menu = popup.querySelector('[data-parent-id="0"]');

  popupHeader.style.position = 'relative';
  popupHeader.prepend(buttonClose);

  document.addEventListener('click', (e) => {
    const tile = e.target.closest('.popup-menu-header [data-submenu-id]');

    if (!tile) return true;

    const submenu = popup.querySelector(`[data-parent-id="${tile.dataset.submenuId}"]`);

    if (!submenu) return true;

    menu.hidden = true;
    submenu.hidden = false;
    buttonClose.hidden = false;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-submenu-close]');

    if (!button) return true;

    const submenu = popup.querySelector(`[data-parent-id]:not([hidden])`);

    if (!submenu) return true;

    menu.hidden = false;
    submenu.hidden = true;
    buttonClose.hidden = true;
  });
});
