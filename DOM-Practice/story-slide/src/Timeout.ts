export default class Timeout {
  id: number;
  handler: TimerHandler;
  startHour: number;
  leftTime: number;

  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = handler;
    this.startHour = Date.now();
    this.leftTime = time;
  }

  clear() {
    clearTimeout(this.id);
  }

  pause() {
    const passedTime = Date.now() - this.startHour;
    this.leftTime = this.leftTime - passedTime;
    this.clear();
  }

  continue() {
    this.clear();
    this.id = setTimeout(this.handler, this.leftTime);
    this.startHour = Date.now();
  }
}
