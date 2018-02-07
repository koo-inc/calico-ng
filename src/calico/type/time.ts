const TIME_PATTERN = /^([0-9]+):([0-9]+)(?::([0-9]+))?$/.compile();
export class TimePoint {
  hours: number;
  minutes: number;

  private invalid = false;

  constructor(minutes: number);
  constructor(time: string);
  constructor(minutes: any) {
    if (typeof minutes == 'string') {
      let groups = TIME_PATTERN.exec(minutes);
      minutes = parseInt(groups[1]) * 60 + parseInt(groups[2]);
    }
    if (minutes == null || Number.isNaN(minutes)) {
      this.invalid = true;
      this.hours = 0;
      this.minutes = 0;
      return this;
    }
    minutes = Math.min(minutes, 99 * 60 + 59);

    this.hours = Math.floor(minutes / 60);
    this.minutes = Math.floor(minutes % 60);

    Object.freeze(this);
  }

  isInvalid() {
    return this.invalid;
  }

  valueOf() {
    return this.getMinutesAmount();
  }

  toString() {
    if (this.invalid) return '';
    return String(this.hours).padLeft(2, '0') + ':' + String(this.minutes).padLeft(2, '0');
  }

  toJSON() {
    if (this.invalid) return null;
    return this.toString();
  }

  getMinutesAmount() {
    return this.hours * 60 + this.minutes;
  }

  addHours(hours: number) {
    return new TimePoint(this.getMinutesAmount() + hours * 60);
  }
  minusHours(hours: number) {
    return new TimePoint(this.getMinutesAmount() - hours * 60);
  }
  addMinutes(minutes: number) {
    return new TimePoint(this.getMinutesAmount() + minutes);
  }
  minusMinutes(minutes: number) {
    return new TimePoint(this.getMinutesAmount() - minutes);
  }

  sub(time: TimePoint) {
    if (time == null) return this.getMinutesAmount();
    return this.getMinutesAmount() - time.getMinutesAmount();
  }

  atTimeOf(date: Date) {
    return date.clone().beginningOfDay().addMinutes(this.getMinutesAmount());
  }

  static create(hours: number, minutes: number): TimePoint;
  static create(minutes: number): TimePoint;
  static create(value: string): TimePoint;
  static create(hours: any, minutes?: any): TimePoint {
    if (arguments.length == 2) {
      if (typeof hours == 'number' && typeof minutes == 'number') {
        return new TimePoint(hours * 60 + minutes);
      }
      else {
        return null;
      }
    }

    if (hours instanceof TimePoint) {
      return hours;
    }

    if (typeof minutes == 'number') {
      minutes = hours;
      return new TimePoint(minutes)
    }

    if (typeof hours == 'string') {
      let groups = /^([0-9]+):([0-9]+)(?::([0-9]+))?$/.exec(hours);
      if (groups != null) {
        return new TimePoint(parseInt(groups[1]) * 60 + parseInt(groups[2]));
      }
    }
    return null;
  }
}
