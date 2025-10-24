window.inputSliderJsIsLoaded = false;

window.addEventListener('load', () => {
  if (window.inputSliderJsIsLoaded) return true;

  window.inputSliderJsIsLoaded = true;

  const sliderTrack = document.querySelector('[data-slider-track]');
  const sliderThumb = document.querySelector('[data-slider-thumb]');
  const sliderValue = document.querySelector('[data-slider-value]');
  const sliderMarkers = document.querySelector('[data-slider-markers]');
  const sliderInput = document.querySelector('[data-slider-input]');

  // Дискретные значения
  const values = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
    15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
  ];
  let currentIndex = 0; // Начальное значение

  // Создание маркеров
  function createMarkers() {
    sliderMarkers.innerHTML = '';

    values.forEach((value, index) => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      const percentage = index / (values.length - 1);
      marker.style.left = `${percentage * 100}%`;

      if (index === currentIndex) {
        marker.classList.add('active');
      }

      sliderMarkers.appendChild(marker);
    });
  }

  // Обновление позиции ползунка и значения
  function updateSliderPosition(index) {
    currentIndex = index;
    const trackWidth = sliderTrack.offsetWidth;
    const percentage = currentIndex / (values.length - 1);
    const thumbPosition = percentage * trackWidth;

    sliderThumb.style.left = `${thumbPosition}px`;
    sliderValue.textContent = `${values[currentIndex].toLocaleString('ru-RU')} руб.`;
    sliderInput.value = values[currentIndex];

    // Обновление активного маркера
    const markers = sliderMarkers.querySelectorAll('.marker');
    markers.forEach((marker, i) => {
      if (i === currentIndex) {
        marker.classList.add('active');
      }
      else {
        marker.classList.remove('active');
      }
    });
  }

  // Поиск ближайшего значения
  function findNearestIndex(position) {
    const trackWidth = sliderTrack.offsetWidth;
    const percentage = position / trackWidth;
    const exactIndex = percentage * (values.length - 1);
    return Math.round(exactIndex);
  }

  // Инициализация
  createMarkers();
  updateSliderPosition(currentIndex);

  // Обработка клика по треку
  sliderTrack.addEventListener('click', function (e) {
    const rect = sliderTrack.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const nearestIndex = findNearestIndex(clickPosition);
    updateSliderPosition(nearestIndex);
  });

  // Обработка перетаскивания ползунка
  let isDragging = false;

  sliderThumb.addEventListener('mousedown', function (e) {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;

    const rect = sliderTrack.getBoundingClientRect();
    const newPosition = e.clientX - rect.left;

    // Ограничение позиции в пределах трека
    const boundedPosition = Math.max(0, Math.min(newPosition, rect.width));
    const nearestIndex = findNearestIndex(boundedPosition);
    updateSliderPosition(nearestIndex);
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // Для сенсорных устройств
  sliderThumb.addEventListener('touchstart', function (e) {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;

    const rect = sliderTrack.getBoundingClientRect();
    const touch = e.touches[0];
    const newPosition = touch.clientX - rect.left;
    const boundedPosition = Math.max(0, Math.min(newPosition, rect.width));
    const nearestIndex = findNearestIndex(boundedPosition);
    updateSliderPosition(nearestIndex);
  });

  document.addEventListener('touchend', function () {
    isDragging = false;
  });

  // Обработка изменения размера окна
  window.addEventListener('resize', function () {
    createMarkers();
    updateSliderPosition(currentIndex);
  });
});
