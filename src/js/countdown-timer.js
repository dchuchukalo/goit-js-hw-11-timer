import timerTemplates from '../templates/timer.hbs';

export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  refreshClock(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    const timeFormules = [days, hours, mins, secs];
    const id = this.selector;
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

  drawInterface() {
    const deltaTime = this.targetDate - Date.now();
    this.refreshClock(deltaTime);
  }

  create() {
    const marckup = timerTemplates(this.selector);
    const bodyRef = document.querySelector('body');
    bodyRef.insertAdjacentHTML('beforeend', marckup);
    this.drawInterface();
    setInterval(() => {
      this.drawInterface();
    }, 1000);
  }
}
