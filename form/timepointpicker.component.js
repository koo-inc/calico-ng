var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, forwardRef, Injector, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverDirective } from '../ui/popover.directive';
import { FormItem } from "./item";
import { TimePoint } from "../type/time";
var str = function (v) { return v != null ? v.toString() : null; };
var ɵ0 = str;
var lpad = function (n) { return n != null ? str(n).padLeft(2, '0') : null; };
var ɵ1 = lpad;
var parse = function (s) {
    if (s == null)
        return [];
    var group = /^([0-9]{1,2})[^0-9]*?([0-9]{1,2})$/.exec(s);
    if (group == null)
        return [];
    return [parseInt(group[1]), parseInt(group[2])].map(function (v) { return Number.isNaN(v) ? null : Math.floor(v); });
};
var ɵ2 = parse;
var TimePointPickerComponent = /** @class */ (function (_super) {
    __extends(TimePointPickerComponent, _super);
    function TimePointPickerComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.defaultTimePoint = TimePoint.create(0);
        _this.stepHour = 1;
        _this.stepMinute = 5;
        _this.placeholder = '時刻';
        _this.textChanged = false;
        _this.keepFlag = false;
        return _this;
    }
    TimePointPickerComponent.prototype.addHours = function (hours) {
        if (this.innerMinutes == null || this.innerHours == null) {
            this.innerHours = 0;
            this.innerMinutes = 0;
        }
        this.innerHours += hours;
        this.justifyInnerValues();
        this.writeBackToTextValue();
        this.value = TimePoint.create(this.textValue);
    };
    TimePointPickerComponent.prototype.addMinutes = function (minutes) {
        if (this.innerMinutes == null || this.innerHours == null) {
            this.innerHours = 0;
            this.innerMinutes = 0;
        }
        this.innerMinutes += minutes;
        this.justifyInnerValues();
        this.writeBackToTextValue();
        this.value = TimePoint.create(this.textValue);
    };
    TimePointPickerComponent.prototype.justifyInnerValues = function () {
        if (this.innerHours == null || this.innerMinutes == null) {
            this.innerHours = 0;
            this.innerMinutes = 0;
        }
        var timeParts = this.justifyTimeParts(this.innerHours, this.innerMinutes);
        this.innerHours = timeParts[0];
        this.innerMinutes = timeParts[1];
    };
    TimePointPickerComponent.prototype.justifyTimeParts = function (h, m) {
        if (h == null || m == null) {
            return [null, null];
        }
        var max = this.max != null ? this.max.getMinutesAmount() : 99 * 60 + 59;
        max = max - (max % this.stepMinute);
        var min = this.min != null ? this.min.getMinutesAmount() : 0;
        min = min % this.stepMinute == 0 ? min : min + (this.stepMinute - (min % this.stepMinute));
        if (max < 0 || min < 0 || min > max) {
            return [null, null];
        }
        var minutes = h * 60 + m;
        while (minutes < 0) {
            minutes = max + minutes;
        }
        minutes = minutes - (minutes % this.stepMinute);
        minutes = Math.min(Math.max(minutes, min), max);
        return [Math.floor(minutes / 60), Math.floor(minutes % 60)];
    };
    TimePointPickerComponent.prototype.writeBackToTextValue = function () {
        if (this.innerHours == null || this.innerMinutes == null) {
            this.innerTextValue = '';
        }
        else {
            this.innerTextValue = this.hoursText + ':' + this.minutesText;
        }
    };
    Object.defineProperty(TimePointPickerComponent.prototype, "hoursText", {
        get: function () {
            return lpad(this.innerHours);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePointPickerComponent.prototype, "minutesText", {
        get: function () {
            return lpad(this.innerMinutes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePointPickerComponent.prototype, "textValue", {
        get: function () {
            return this.innerTextValue;
        },
        set: function (value) {
            if (value !== this.innerTextValue) {
                this.textChanged = true;
                this.innerTextValue = value;
                this.popover.close();
                var timeparts = parse(value);
                timeparts = this.justifyTimeParts(timeparts[0], timeparts[1]);
                if (this.innerHours != timeparts[0] || this.innerMinutes != timeparts[1]) {
                    this.innerHours = timeparts[0];
                    this.innerMinutes = timeparts[1];
                    this.value = TimePoint.create(this.innerHours, this.innerMinutes);
                    this.popover.open();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TimePointPickerComponent.prototype.isInvalidText = function () {
        return this.innerTextValue != null && this.innerTextValue != '' && this.value === this.defaultTimePoint;
    };
    TimePointPickerComponent.prototype.adjustTextValue = function () {
        if (!this.textChanged)
            return;
        if (this.value !== this.defaultTimePoint) {
            this.innerTextValue = str(this.value);
        }
        this.textChanged = false;
    };
    TimePointPickerComponent.prototype.writeValue = function (value) {
        var tp = TimePoint.create(value);
        if (tp != null) {
            this.innerHours = tp.hours;
            this.innerMinutes = tp.minutes;
        }
        _super.prototype.writeValue.call(this, tp);
        this.innerTextValue = str(tp);
        this.textChanged = false;
    };
    TimePointPickerComponent.prototype.keep = function () {
        this.keepFlag = true;
    };
    TimePointPickerComponent.prototype.onClick = function ($event) {
        this.popover.open();
    };
    TimePointPickerComponent.prototype.onFocus = function ($event) {
        this.popover.open();
    };
    TimePointPickerComponent.prototype.onBlur = function ($event) {
        if (this.keepFlag) {
            $event.target.focus();
            this.keepFlag = false;
        }
        else {
            this.popover.close();
        }
        this.adjustTextValue();
    };
    TimePointPickerComponent.prototype.onKeydown = function ($event) {
        switch ($event.code) {
            case 'ArrowUp':
                this.addMinutes(this.stepMinute);
                break;
            case 'ArrowDown':
                this.addMinutes(-this.stepMinute);
                break;
        }
    };
    TimePointPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-timepointpicker',
                    template: "\n    <span class=\"text-input-container\">\n      <input type=\"text\" [(ngModel)]=\"textValue\"\n             [class.invalid]=\"isInvalid()\"\n             [disabled]=\"readonly\"\n             [placeholder]=\"placeholder\"\n             #popover=\"cPopover\"\n             [cPopover]=\"popoverTpl\"\n             (focus)=\"onFocus($event); focus.next($event)\"\n             (blur)=\"onBlur($event); blur.next($event)\"\n             (click)=\"onClick($event)\"\n             (keydown)=\"onKeydown($event)\"\n      ><span class=\"text-input-icon fa fa-clock-o\"\n    ></span><span class=\"invalid-text-format glyphicon glyphicon-warning-sign\"\n                  [class.active]=\"isInvalidText()\"\n    ></span>\n    </span>\n    <ng-template #popoverTpl>\n      <div class=\"c-timepointpicker-popover\" (mousedown)=\"keep($event)\">\n        <div class=\"hours\">\n          <a cGlyphicon=\"menu-up\" (click)=\"addHours(stepHour)\"></a>\n          <div class=\"value\">{{hoursText}}</div>\n          <a cGlyphicon=\"menu-down\" (click)=\"addHours(-stepHour)\"></a>\n        </div>\n        <div class=\"separator\">:</div>\n        <div class=\"minutes\">\n          <a cGlyphicon=\"menu-up\" (click)=\"addMinutes(stepMinute)\"></a>\n          <div class=\"value\">{{minutesText}}</div>\n          <a cGlyphicon=\"menu-down\" (click)=\"addMinutes(-stepMinute)\"></a>\n        </div>\n      </div>\n    </ng-template>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TimePointPickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TimePointPickerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    TimePointPickerComponent.propDecorators = {
        defaultTimePoint: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        stepHour: [{ type: Input }],
        stepMinute: [{ type: Input }],
        placeholder: [{ type: Input }],
        popover: [{ type: ViewChild, args: ['popover',] }]
    };
    return TimePointPickerComponent;
}(FormItem));
export { TimePointPickerComponent };
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=timepointpicker.component.js.map