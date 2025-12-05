window.addEventListener('load', () => {
  function fixHeight() {
    const namesNames = document.querySelectorAll('.comparison-properties .property-name-wrapper .name');
    const namesValues = document.querySelectorAll('.comparison-properties .property-name-wrapper .value');

    const columns = document.querySelectorAll('.comparison-properties .column');
    const valuesValues = columns[0].querySelectorAll('.property-value-wrapper');

    for (let i = 0; i < valuesValues.length; i++) {
      namesValues[i].style.height = `${valuesValues[i].clientHeight}px`;
    }

    columns.forEach((column) => {
      const valuesNames = column.querySelectorAll('.property-value-wrapper .name');

      for (let i = 0; i < valuesNames.length; i++) {
        valuesNames[i].style.height = `${namesNames[i].clientHeight}px`;
      }
    });

    const wrapper = document.querySelector('.comparison-properties');

    if (wrapper) wrapper.style.visibility = 'visible';
  }

  setTimeout(fixHeight, 10);

  document.querySelectorAll('.comparison-properties .column').forEach((column) => {
    column.style.gridRow = `auto / span ${column.children.length}`;
  });

  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-remove-all]');

    if (!button) return true;

    await window.comparison.remove();

    window.location.assign(button.dataset.redirectTo);
  });


  const slider1 = document.querySelector('.comparison-products');
  const slider2 = document.querySelector('.comparison-properties .properties');

  let isUpdating = false;

  function syncScroll(source, target) {
    if (isUpdating) return;

    isUpdating = true;
    target.scrollLeft = source.scrollLeft;

    requestAnimationFrame(() => {
      isUpdating = false;
    });
  }

  slider1.addEventListener('scroll', () => syncScroll(slider1, slider2));
  slider2.addEventListener('scroll', () => syncScroll(slider2, slider1));
});
