window.addEventListener('load', () => {

  function fixProductsHeight() {
    const productHeight = document.querySelector('.comparison-wrapper .product-wrapper .product').clientHeight;
    const removeHeight = document.querySelector('.comparison-wrapper .remove-top').clientHeight;

    document.querySelector('.comparison-wrapper .remove-top').style.top = `${productHeight}px`;

    document.querySelector('.comparison-wrapper .remove-bottom .product').style.height = `${productHeight}px`;
    document.querySelector('.comparison-wrapper .remove-bottom .remove').style.height = `${removeHeight}px`;

    document.querySelectorAll('.comparison-wrapper .slider .column .remove').forEach((remove) => {
      remove.style.height = `${removeHeight}px`;
    });
  }

  function fixPropertiesHeight() {
    const namesNames = document.querySelectorAll('.comparison-wrapper .property-name-wrapper .name');
    const namesValues = document.querySelectorAll('.comparison-wrapper .property-name-wrapper .value');

    const columns = document.querySelectorAll('.comparison-wrapper .slider .column');
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
  }

  function fixHeight() {
    fixProductsHeight();
    fixPropertiesHeight();

    const wrapper = document.querySelector('.comparison-wrapper');

    if (wrapper) wrapper.style.visibility = 'visible';
  }

  setTimeout(fixHeight, 10);

  document.querySelectorAll('.comparison-wrapper .slider .column').forEach((column) => {
    column.style.gridRow = `auto / span ${column.children.length}`;
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-remove-all]');

    if (!button) return true;

    window.comparison.remove();

    window.location.assign(button.dataset.redirectTo);
  });
});
