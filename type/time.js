var TimePoint = /** @class */ (function () {
    function TimePoint(minutes) {
        this.invalid = false;
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
    TimePoint.prototype.isInvalid = function () {
        return this.invalid;
    };
    TimePoint.prototype.valueOf = function () {
        return this.getMinutesAmount();
    };
    TimePoint.prototype.toString = function () {
        if (this.invalid)
            return '';
        return String(this.hours).padLeft(2, '0') + ':' + String(this.minutes).padLeft(2, '0');
    };
    TimePoint.prototype.toJSON = function () {
        if (this.invalid)
            return null;
        return this.toString();
    };
    TimePoint.prototype.getMinutesAmount = function () {
        return this.hours * 60 + this.minutes;
    };
    TimePoint.prototype.addHours = function (hours) {
        return new TimePoint(this.getMinutesAmount() + hours * 60);
    };
    TimePoint.prototype.minusHours = function (hours) {
        return new TimePoint(this.getMinutesAmount() - hours * 60);
    };
    TimePoint.prototype.addMinutes = function (minutes) {
        return new TimePoint(this.getMinutesAmount() + minutes);
    };
    TimePoint.prototype.minusMinutes = function (minutes) {
        return new TimePoint(this.getMinutesAmount() - minutes);
    };
    TimePoint.prototype.sub = function (time) {
        if (time == null)
            return this.getMinutesAmount();
        return this.getMinutesAmount() - time.getMinutesAmount();
    };
    TimePoint.prototype.atTimeOf = function (date) {
        return date.clone().beginningOfDay().addMinutes(this.getMinutesAmount());
    };
    TimePoint.create = function (hours, minutes) {
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
        if (typeof hours == 'number') {
            minutes = hours;
            return new TimePoint(minutes);
        }
        if (typeof hours == 'string') {
            var groups = /^([0-9]+):([0-9]+)(?::([0-9]+))?$/.exec(hours);
            if (groups != null) {
                return new TimePoint(parseInt(groups[1]) * 60 + parseInt(groups[2]));
            }
        }
        return null;
    };
    return TimePoint;
}());
export { TimePoint };
//# sourceMappingURL=time.js.map