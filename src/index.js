import './styles.scss';
import CountdownTimer from './js/countdown-timer'


new CountdownTimer({
  selector: 'timer-1',
  targetDate: new Date(1600000000000),
}).create();

new CountdownTimer({
  selector: 'timer-2',
  targetDate: new Date('dec 31, 2020'),
}).create();
