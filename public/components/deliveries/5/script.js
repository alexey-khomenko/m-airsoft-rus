if ('undefined' === typeof window.deliveries) window.deliveries = {};

const key = 'delivery-5';

window.deliveries[key] = {
  mount: function () {
    this.init();
    console.log(`${key} mount`);
    document.addEventListener('click', this.handler);
  },
  unmount: function () {
    console.log(`${key} unmount`);
    document.removeEventListener('click', this.handler);
  },
  handler: async function (e) {
    const map = e.target.closest('.map');

    if (map) {
      {
        const cityObj = document.querySelector('[data-order-city-info-code]');
        const oldCode = cityObj.dataset.orderCityInfoCode;
        let newCode;

        switch (oldCode) {
          case '0000103664':
            newCode = '0000073738';
            break;
          case '0000073738':
            newCode = '';
            break;
          default:
            newCode = '0000103664';
            break;
        }

        cityObj.setAttribute('data-order-city-info-code', newCode);
      }

      const _this = window.deliveries[key];

      {
        _this.hideDateTime();

        _this.setCityKey();
        _this.buildDatesTiles();
        _this.buildTimesTiles();
        // select
        _this.showDateTime();
      }

      const action = _this.form.action;

      console.log('POST request to', action);

      return true;
    }
  },
  init: function () {
    this.form = document.querySelector('[data-form-order-delivery-courier]');

    this.calendar = JSON.parse(this.form.dataset.calendar);
    this.cityTimes = JSON.parse(this.form.dataset.cityTimes);
    this.cityCodes = JSON.parse(this.form.dataset.cityCodes);
    this.session = JSON.parse(this.form.dataset.session);

    this.datetime = {
      msk: {
        dates: this.buildDatesData(Object.keys(this.calendar.msk)),
        times: this.buildTimesData(this.calendar.msk, this.cityTimes.msk),
      },
      spb: {
        dates: this.buildDatesData(Object.keys(this.calendar.spb)),
        times: this.buildTimesData(this.calendar.spb, this.cityTimes.spb),
      },
    };

    this.setCityKey();
    this.buildDatesTiles();
    this.buildTimesTiles();
    // select


    // Если нет выбранной даты.
    // Кликнуть дату из сессии или первое доступное.

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
    console.log(this.cityTimes);
    console.log(this.cityCodes);
    console.log(this.session);
    console.log(this.datetime);
    console.log('----');
  },
  buildDatesData: function (allDays) {
    if (1 > allDays.length) return [];

    const data = [];

    const firstDay = allDays.concat().shift().split('.').reverse().join('-');
    const lastDay = allDays.concat().pop().split('.').reverse().join('-');

    let tmp = new Date(firstDay);

    if (firstDay === lastDay) {
      data.push(this.buildDateData(tmp, allDays));
    }
    else {
      let currentDay = firstDay;

      while (currentDay < lastDay) {
        data.push(this.buildDateData(tmp, allDays));

        currentDay = tmp.toISOString().slice(0, 10);

        tmp.setDate(tmp.getDate() + 1);
      }
    }

    return data;
  },
  buildDateData: function (tmp, allDays) {
    const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    const value = (tmp.toISOString().slice(0, 10)).split('-').reverse().join('.');

    return {
      inputValue: value,
      dateValue: value.substr(0, 2),
      weekValue: weekdays[tmp.getDay()],
      disabled: allDays.indexOf(value) === -1,
    };
  },
  buildTimesData: function (calendar, cityTimes) {
    const data = [];

    for (const date in calendar) {
      const tmp = {};

      tmp[date] = [];

      for (const time of cityTimes) {
        tmp[date].push({
          value: time,
          disabled: !Object.keys(calendar[date]).includes(time),
        });
      }

      data.push(tmp);
    }

    return data;
  },
  buildDatesTiles: function () {
    if (1 > this.cityKey.length) return;

    console.log(this.datetime[this.cityKey].dates);

    // Взять данные для дат.
    // Сгенерировать плитки дат.
    // Заполнить '.dates'.

    const wrapper = this.form.querySelector('.dates');

    wrapper.innerHTML = '';
  },
  buildTimesTiles: function () {
    if (1 > this.cityKey.length) return;

    console.log(this.datetime[this.cityKey].times);

    // Взять каноничные данные для времени.
    // Сгенерировать плитки времени.
    // Заполнить '.times'.

    const wrapper = this.form.querySelector('.times');

    wrapper.innerHTML = '';
  },
  showDateTime: function () {
    if (1 > this.cityKey.length) return;

    this.form.querySelector('.datetime').hidden = false;
  },
  hideDateTime: function () {
    this.form.querySelector('.datetime').hidden = true;
  },
  setCityKey: function () {
    const cityCode = document.querySelector('[data-order-city-info-code]').dataset.orderCityInfoCode;

    this.cityKey = '';

    if (this.cityCodes.msk.includes(cityCode)) this.cityKey = 'msk';
    else if (this.cityCodes.spb.includes(cityCode)) this.cityKey = 'spb';

    console.log(this.cityKey, cityCode); // TODO: -
  },

  form: null,

  calendar: {},
  cityTimes: {},
  cityCodes: {},
  session: {},
  datetime: {},

  cityKey: null,
};
