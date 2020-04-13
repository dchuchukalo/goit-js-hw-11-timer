import timerTemplates from '../templates/timer.hbs';

let id = null;

const bodyRef = document.querySelector('body');

function pad(value) {
  return String(value).padStart(2, '0');
}

 function refreshClock(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  const timeFormules = [days, hours, mins, secs];

  const timeRefs = {
    daysRef: document.querySelector(`#${id} [data-value="days"]`),
    hoursRef: document.querySelector(`#${id} [data-value="hours"]`),
    minsRef: document.querySelector(`#${id} [data-value="mins"]`),
    secsRef: document.querySelector(`#${id} [data-value="secs"]`),
  };

  let i = 0;
  for (const key in timeRefs) {
    timeRefs[key].textContent = [...timeFormules[i]];
    i += 1;
  }
}

export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  
  create() {
    const marckup = timerTemplates(this.selector);
    setTimeout(() => {
      bodyRef.insertAdjacentHTML('beforeend', marckup);
    }, 1000);
    setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      id = this.selector;
      refreshClock(deltaTime);
    }, 1000);
  }
}
