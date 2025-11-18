window.addEventListener('load', () => {

  function gridRowHeight() {
    const namesNames = document.querySelectorAll('.comparison-wrapper .name-wrapper .name');
    const namesValues = document.querySelectorAll('.comparison-wrapper .name-wrapper .value');
    const columns = document.querySelectorAll('.comparison-wrapper .slider .column');
    const valuesValues = columns[1].querySelectorAll('.value-wrapper');

    for (let i = 0; i < valuesValues.length; i++) {
      namesValues[i].style.height = `${valuesValues[i].clientHeight}px`;
    }

    columns.forEach((column) => {
      const valuesNames = column.querySelectorAll('.name');

      for (let i = 0; i < valuesNames.length; i++) {
        valuesNames[i].style.height = `${namesNames[i].clientHeight}px`;
      }
    });

    const wrapper = document.querySelector('.comparison-wrapper');

    if (wrapper) wrapper.style.visibility = 'visible';
  }

  setTimeout(() => {
    gridRowHeight();
  }, 10);


  document.querySelectorAll('.comparison-wrapper .slider .column').forEach((column) => {
    column.style.gridRow = `auto / span ${column.children.length}`;
  });
});
