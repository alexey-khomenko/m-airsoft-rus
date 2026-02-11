if ('undefined' === typeof window.deliveries) window.deliveries = {};

window.deliveries['delivery-5'] = {
  mount: function () {
    document.addEventListener('click', this.handlerClick);
    document.addEventListener('input', this.handlerInput);
    document.addEventListener('focusin', this.handlerFocusin);
    document.addEventListener('focusout', this.handlerFocusout);
    document.addEventListener('submit', this.handlerSubmit);
    console.log('delivery-5 mount');
    this.init();
  },
  unmount: function () {
    document.removeEventListener('click', this.handlerClick);
    document.removeEventListener('input', this.handlerInput);
    document.removeEventListener('focusin', this.handlerFocusin);
    document.removeEventListener('focusout', this.handlerFocusout);
    document.removeEventListener('submit', this.handlerSubmit);
    console.log('delivery-5 unmount');
    if (null !== this.slider) this.slider.destroy();
  },
  handlerClick: async function (e) {
    const _this = window.deliveries['delivery-5'];

    const map = e.target.closest('.map');
    const clear = e.target.closest('[data-courier-address-clear]');
    const tile = e.target.closest('.datetime-tile');

    if (map) {
      // TODO: _this.showDateTime();
      // TODO: _this.hideDateTime();
      console.log('The map was clicked!');

      return true;
    }

    if (clear) {
      const address = _this.form.querySelector('[data-input-courier-address]');

      if (!address) return true;

      address.value = '';
      address.focus();

      await _this.save(_this);
      return true;
    }

    if (tile) {
      const input = tile.querySelector('[type="radio"]');

      if (!input) return true;

      if (input.disabled || input.checked) return true;

      input.checked = true;
      input.dispatchEvent(new Event('input', {bubbles: true}));

      return true;
    }

    return true;
  },
  handlerInput: async function (e) {
    const _this = window.deliveries['delivery-5'];

    const address = e.target.closest('[data-input-courier-address]');
    const housing = e.target.closest('[data-input-courier-housing]');
    const entrance = e.target.closest('[data-input-courier-entrance]');
    const apartment = e.target.closest('[data-input-courier-apartment]');
    const date = e.target.closest('.datetime-tile [name="date"]');
    const time = e.target.closest('.datetime-tile [name="time"]');

    if (address) {
      const clear = _this.form.querySelector('[data-courier-address-clear]');

      if (clear) clear.hidden = 0 === address.value.length;

      await _this.save(_this);
      return true;
    }

    if (date) _this.checkTimeTile();

    if (housing || entrance || apartment || time || date) {
      await _this.save(_this);
      return true;
    }

    return true;
  },
  handlerFocusin: async function (e) {
    const _this = window.deliveries['delivery-5'];

    const address = e.target.closest('[data-input-courier-address]');

    if (address) {
      const svg = _this.form.querySelector('[data-courier-address-clear]');

      if (svg) svg.hidden = 0 === address.value.length;

      return true;
    }

    return true;
  },
  handlerFocusout: async function (e) {
    const _this = window.deliveries['delivery-5'];

    const address = e.target.closest('[data-input-courier-address]');

    if (address) {
      const svg = _this.form.querySelector('[data-courier-address-clear]');

      setTimeout(function () {
        if (svg) svg.hidden = true;
      }, 300);

      return true;
    }

    return true;
  },
  handlerSubmit: function (e) {
    const form = e.target.closest('[data-form-order-delivery-courier]');

    if (form) e.preventDefault();
  },
  save: async function () {
    clearTimeout(this.debounceTimer);

    const action = this.form.action;

    const address = this.form.querySelector('[data-input-courier-address]');
    const housing = this.form.querySelector('[data-input-courier-housing]');
    const entrance = this.form.querySelector('[data-input-courier-entrance]');
    const apartment = this.form.querySelector('[data-input-courier-apartment]');
    const date = this.form.querySelector('[name="date"]:checked');
    const time = this.form.querySelector('[name="time"]:checked');

    this.debounceTimer = setTimeout(async function () {
      console.log('POST request to', action);

      const data = new FormData();

      if (address) {
        const value = address.value.trim();
        console.log('address', value);
        data.set('address', value);
      }

      if (housing) {
        const value = housing.value.trim();
        console.log('housing', value);
        data.set('housing', value);
      }

      if (entrance) {
        const value = entrance.value.trim();
        console.log('entrance', value);
        data.set('entrance', value);
      }

      if (apartment) {
        const value = apartment.value.trim();
        console.log('apartment', value);
        data.set('apartment', value);
      }

      if (date) {
        const value = date.value.trim();
        console.log('date', value);
        data.set('date', value);
      }

      if (time) {
        const value = time.value.trim();
        console.log('time', value);
        data.set('time', value);
      }


      await new Promise(r => setTimeout(r, 3000));


    }, this.debounceMs);
  },
  init: function () {
    this.form = document.querySelector('[data-form-order-delivery-courier]');

    this.calendar = JSON.parse(this.form.dataset.calendar);
    this.times = JSON.parse(this.form.dataset.times);
    this.session = JSON.parse(this.form.dataset.session);

    if (0 === Object.keys(this.calendar).length) return;
    if (0 === Object.keys(this.times).length) return;

    for (const time in this.times) {
      if (0 === this.times[time].length) return;
    }

    this.datetime = {
      dates: this.buildDatesData(),
      times: this.buildTimesData(),
    };

    this.buildDatesTiles();
    this.buildTimesTiles();

    this.checkDateTile();
    this.checkTimeTile();

    this.showDateTime();
  },
  buildDatesData: function () {
    const allDays = Object.keys(this.calendar);

    if (0 === allDays.length) return [];

    const data = [];

    const firstDay = allDays.concat().shift().split('.').reverse().join('-');
    const lastDay = allDays.concat().pop().split('.').reverse().join('-');

    let tmp = new Date(firstDay);

    if (firstDay === lastDay) {
      data.push(this._buildDateData(tmp, allDays));
    }
    else {
      let currentDay = firstDay;

      while (currentDay !== lastDay) {
        data.push(this._buildDateData(tmp, allDays));

        currentDay = tmp.toISOString().slice(0, 10);

        tmp.setDate(tmp.getDate() + 1);
      }
    }

    return data;
  },
  _buildDateData: function (tmp, allDays) {
    const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    const value = (tmp.toISOString().slice(0, 10)).split('-').reverse().join('.');

    return {
      inputValue: value,
      dateValue: value.substr(0, 2),
      weekValue: weekdays[tmp.getDay()],
      disabled: allDays.indexOf(value) === -1,
    };
  },
  buildTimesData: function () {
    const data = [];

    for (const date in this.calendar) {
      const tmp = {};

      tmp[date] = [];

      for (const time in this.times) {
        tmp[date].push({
          value: time,
          disabled: !Object.keys(this.calendar[date]).includes(time),
        });
      }

      data.push(tmp);
    }

    return data;
  },
  buildDatesTiles: function () {
    if (0 === this.datetime.dates.length) return;

    const wrapper = this.form.querySelector('.dates .swiper-wrapper');
    const sample = document.querySelector('[data-tile-sample="courier-date"] div');

    wrapper.innerHTML = '';
    for (const date of this.datetime.dates) {

      const tile = sample.cloneNode(true);

      tile.hidden = false;
      tile.classList.add('swiper-slide');
      tile.querySelector('[type="radio"]').setAttribute('value', date.inputValue);
      tile.querySelector('[type="radio"]').disabled = date.disabled;
      tile.querySelector('[data-date-value]').textContent = date.dateValue;
      tile.querySelector('[data-week-value]').textContent = date.weekValue;

      wrapper.append(tile);
    }

    if (1 === this.datetime.dates.length) return;
    if (2 === this.datetime.dates.length) return;
    if (3 === this.datetime.dates.length) return;
    if (4 === this.datetime.dates.length) return;
    if (5 === this.datetime.dates.length) return;

    this.slider = new Swiper('.dates', {
      direction: 'horizontal',
      loop: false,
      breakpointsBase: 'container',
      slidesPerView: 5,
      slidesPerGroup: 5,
      breakpoints: {
        244: {
          spaceBetween: 6,
        },
        278: {
          spaceBetween: 7,
        },
        312: {
          spaceBetween: 8,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  buildTimesTiles: function () {
    if (0 === this.datetime.dates.length) return;

    const wrapper = this.form.querySelector('.times');
    const sample = document.querySelector('[data-tile-sample="courier-time"] div');

    wrapper.innerHTML = '';
    for (const time in this.times) {

      const tile = sample.cloneNode(true);

      tile.hidden = false;

      tile.querySelector('[type="radio"]').setAttribute('value', time);
      tile.querySelector('[data-time-value]').textContent = time;

      wrapper.append(tile);
    }
  },
  checkDateTile: function () {
    if (0 !== this.session.date.length) {
      if (this.session.date in this.calendar) {
        this.form.querySelector(`[name="date"][value="${this.session.date}"]`).checked = true;
        return;
      }
    }

    this.form.querySelector('[name="date"]:not([disabled])').checked = true;
  },
  checkTimeTile: function () {
    const date = this.form.querySelector('[name="date"]:checked');

    if (date) {
      for (const obj of this.datetime.times) {
        if (date.value in obj) {
          for (const time of obj[date.value]) {
            const {value, disabled} = time;
            this.form.querySelector(`[name="time"][value="${value}"]`).disabled = disabled;
          }

          break;
        }
      }
    }

    if (0 !== this.session.time.length) {
      const input = this.form.querySelector(`[name="time"][value="${this.session.time}"]:not([disabled])`);

      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event('input', {bubbles: true}));
        return;
      }
    }

    const input = this.form.querySelector('[name="time"]:not([disabled])');
    input.checked = true;
    input.dispatchEvent(new Event('input', {bubbles: true}));
  },
  showDateTime: function () {
    if (0 === this.datetime.dates.length) return;

    this.form.querySelector('.datetime').hidden = false;
    this.form.querySelector('[data-alert-address]').hidden = true;
  },
  hideDateTime: function () {
    if (0 === this.datetime.dates.length) return;

    this.form.querySelector('.datetime').hidden = true;
    this.form.querySelector('[data-alert-address]').hidden = false;
  },
  form: null,
  calendar: {},
  times: {},
  session: {},
  datetime: {},
  slider: null,
  debounceTimer: null,
  debounceMs: 1500,
};
