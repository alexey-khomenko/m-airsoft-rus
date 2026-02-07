if ('undefined' === typeof window.deliveries) window.deliveries = {};

const key = 'delivery-5';

window.deliveries[key] = {
  mount: function () {
    this.init();
    console.log(`${key} mount`);
    document.addEventListener('click', this.handlerClick);
    document.addEventListener('input', this.handlerInput);
    document.addEventListener('focusin', this.handlerFocusin);
    document.addEventListener('focusout', this.handlerFocusout);
  },
  unmount: function () {
    console.log(`${key} unmount`);
    document.removeEventListener('click', this.handlerClick);
    document.removeEventListener('input', this.handlerInput);
    document.removeEventListener('focusin', this.handlerFocusin);
    document.removeEventListener('focusout', this.handlerFocusout);
  },
  handlerClick: async function (e) {
    const _this = window.deliveries[key];

    const map = e.target.closest('.map');
    const clear = e.target.closest('[data-courier-address-clear]');
    const tile = e.target.closest('.datetime-tile');

    if (map) {
      // TODO: alert

      const action = _this.form.action;

      console.log('POST request to', action);

      return true;
    }

    if (clear) {
      const address = _this.form.querySelector('[data-input-courier-address]');

      if (!address) return true;

      address.value = '';
      address.focus();

      console.log('address', address.value);
      return true;
    }

    if (tile) {
      const input = tile.querySelector('[type="radio"]');

      if (!input) return true;

      if (input.checked || input.disabled) return true;

      input.checked = true;

      console.log('radio', input.name, input.value);
      return true;
    }

    // TODO: _this.showDateTime();
    // TODO: _this.hideDateTime();

    return true;
  },
  handlerInput: async function (e) {
    const _this = window.deliveries[key];

    const address = e.target.closest('[data-input-courier-address]');
    const housing = e.target.closest('[data-input-courier-housing]');
    const entrance = e.target.closest('[data-input-courier-entrance]');
    const apartment = e.target.closest('[data-input-courier-apartment]');

    if (address) {
      const svg = _this.form.querySelector('[data-courier-address-clear]');

      if (svg) svg.hidden = 1 > address.value.length;

      console.log('address', address.value);
      return true;
    }

    if (housing) {
      console.log('housing', housing.value);
      return true;
    }

    if (entrance) {
      console.log('entrance', entrance.value);
      return true;
    }

    if (apartment) {
      console.log('apartment', apartment.value);
      return true;
    }

    return true;
  },
  handlerFocusin: async function (e) {
    const _this = window.deliveries[key];

    const address = e.target.closest('[data-input-courier-address]');

    if (address) {
      const svg = _this.form.querySelector('[data-courier-address-clear]');

      if (svg) svg.hidden = 1 > address.value.length;

      return true;
    }

    return true;
  },
  handlerFocusout: async function (e) {
    const _this = window.deliveries[key];

    const address = e.target.closest('[data-input-courier-address]');

    if (address) {
      const svg = _this.form.querySelector('[data-courier-address-clear]');

      setTimeout(() => {
        if (svg) svg.hidden = true;
      }, 300);

      return true;
    }

    return true;
  },
  init: function () {
    this.form = document.querySelector('[data-form-order-delivery-courier]');

    this.calendar = JSON.parse(this.form.dataset.calendar);
    this.times = JSON.parse(this.form.dataset.times);
    this.session = JSON.parse(this.form.dataset.session);

    this.datetime = {
      dates: this.buildDatesData(),
      times: this.buildTimesData(),
    };

    this.buildDatesTiles();
    this.buildTimesTiles();


    // selectDateTile()
    // Кликнуть дату из сессии или первое доступное.

    // selectTimeTile()
    // Зная выбранную дату заполнить disabled у плиток времени
    // Если время из сессии доступно, то кликнуть его.
    // Если нет, то первое доступное.

    // ^ Уедет в событие changeDate.
    // Событие changeTime отдельно.

    // TODO: время
    // selectChange(date, selectChangeMode); ???

    //const date = 0 < this.session.date.length && allDays.includes(this.session.date) ? this.session.date : allDays[0];
    //console.log(date);


    this.showDateTime();

    // TODO: -
    console.log('----');
    console.log(this.calendar);
    console.log(this.times);
    console.log(this.session);
    console.log('----');
    console.log(this.datetime);
    console.log('----');
  },
  buildDatesData: function () {
    const allDays = Object.keys(this.calendar);

    if (1 > allDays.length) return [];

    const data = [];

    const firstDay = allDays.concat().shift().split('.').reverse().join('-');
    const lastDay = allDays.concat().pop().split('.').reverse().join('-');

    let tmp = new Date(firstDay);

    if (firstDay === lastDay) {
      data.push(this._buildDateData(tmp, allDays));
    }
    else {
      let currentDay = firstDay;

      while (currentDay < lastDay) {
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
    if (1 > this.datetime.dates.length) return;

    const wrapper = this.form.querySelector('.dates');
    const sample = document.querySelector('[data-tile-sample="courier-date"] div');

    wrapper.innerHTML = '';
    for (const date of this.datetime.dates) {

      const tile = sample.cloneNode(true);

      tile.hidden = false;

      tile.querySelector('[type="radio"]').setAttribute('value', date.inputValue);
      tile.querySelector('[type="radio"]').disabled = date.disabled;
      tile.querySelector('[data-date-value]').textContent = date.dateValue;
      tile.querySelector('[data-week-value]').textContent = date.weekValue;

      wrapper.append(tile);
    }
  },
  buildTimesTiles: function () {
    if (1 > this.datetime.dates.length) return;

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
  showDateTime: function () {
    if (1 > this.datetime.dates.length) return;

    this.form.querySelector('.datetime').hidden = false;
  },
  hideDateTime: function () {
    this.form.querySelector('.datetime').hidden = true;
  },
  form: null,
  calendar: {},
  times: {},
  session: {},
  datetime: {},
};
