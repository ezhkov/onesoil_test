import expando from 'expando';
import Pikaday from 'pikaday';
import { format as dateFormat } from 'date-fns'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

let map1, map2;


map1 = new google.maps.Map(document.getElementById('map1'), {
  center: {lat: 53.3212891, lng: 27.3332786},
  zoom: 14,
  disableDefaultUI: true,
  mapTypeId: 'satellite',
});
map2 = new google.maps.Map(document.getElementById('map2'), {
  center: {lat: 53.3212891, lng: 27.3332786},
  zoom: 14,
  disableDefaultUI: true,
  mapTypeId: 'satellite',
});

const collapsibles = document.querySelectorAll('.js-collapsible');
const buttons = document.querySelectorAll('.js-trigger-action');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
  });
})

collapsibles.forEach(collapsible => {
  const trigger = collapsible.querySelector('.js-collapsible-trigger');
  const body = collapsible.querySelector('.js-collapsible-body');

  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('collapsible-trigger--disabled')) { return; }
    this.classList.add('is-animating');
    if (this.classList.contains('expanded')) {
      expando.collapse(body, () => { this.classList.remove('expanded', 'is-animating')});
    } else {
      expando.expand(body, () => { this.classList.add('expanded'); this.classList.remove('is-animating')});
    }
  })
})

const pickers = document.querySelectorAll('.js-picker');
pickers.forEach(p => {
  const picker = new Pikaday({
    field: p,
    format: 'dd.MM.yyyy',
    defaultDate: new Date(),
    setDefaultDate: true,
    toString(date, format) {
      return dateFormat(date, format);
    },
    showDaysInNextAndPreviousMonths: true,
    firstDay: 1,
    parse(dateString, format) {
      const parts = dateString.split('.');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    },
    theme: 'onesoil',
    i18n: {
      previousMonth : 'Предыдущий',
      nextMonth     : 'Следующий',
      months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
      weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
    }
  });
});

tippy('[data-tippy-content]', {
  arrow: false,
  offset: [0, -10],
  theme: 'onesoil',
});

