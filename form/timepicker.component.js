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
import { PopoverDirective } from "../ui/popover.directive";
import { FormItem } from "./item";
var TimepickerComponent = /** @class */ (function (_super) {
    __extends(TimepickerComponent, _super);
    function TimepickerComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.defaultDate = _this.toDate('00:00');
        _this.stepHour = 1;
        _this.stepMinute = 5;
        _this.placeholder = '時間';
        _this.strictType = false;
        _this.textChanged = false;
        _this.keepFlag = false;
        return _this;
    }
    Object.defineProperty(TimepickerComponent.prototype, "textValue", {
        get: function () {
            return this.innerTextValue;
        },
        set: function (value) {
            if (value !== this.innerTextValue) {
                this.textChanged = true;
                this.popover.close();
                this.innerTextValue = value;
                var d = this.toDate(this.innerTextValue);
                this.innerTimepickerValue = d;
                this.value = d != null ? this.strictType ? d : d.toISOString() : null;
                this.popover.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    TimepickerComponent.prototype.isInvalidText = function () {
        return this.innerTextValue != null && this.innerTextValue != '' && this.timepickerValue === this.defaultDate;
    };
    TimepickerComponent.prototype.adjustTextValue = function () {
        if (!this.textChanged)
            return;
        if (this.timepickerValue !== this.defaultDate) {
            this.innerTextValue = this.formatDate(this.timepickerValue);
        }
        this.textChanged = false;
    };
    Object.defineProperty(TimepickerComponent.prototype, "timepickerValue", {
        get: function () {
            return this.innerTimepickerValue || this.defaultDate;
        },
        set: function (value) {
            value = this.toDate(value);
            if (!Object.isEqual(value, this.innerTimepickerValue) && value !== this.defaultDate) {
                this.innerTimepickerValue = value;
                this.innerTextValue = this.formatDate(value);
                this.textChanged = false;
                this.value = value != null ? this.strictType ? value : value.toISOString() : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    TimepickerComponent.prototype.writeValue = function (value) {
        var date = this.toDate(value);
        _super.prototype.writeValue.call(this, date);
        this.innerTextValue = this.formatDate(date);
        this.textChanged = false;
        this.innerTimepickerValue = date;
    };
    TimepickerComponent.prototype.toDate = function (value) {
        if (value == null || value == '')
            return null;
        if (typeof value === 'string' && (value.length < 5 || value.indexOf(':') < 0))
            return null;
        var d = value instanceof Date ? value : Date.create(value);
        if (isNaN(d.getTime()))
            return null;
        var offset = d.getTimezoneOffset();
        var mills = ((Math.floor(d.getTime() / (1).minute()) - offset) % (24 * 60) + offset) * (1).minutes();
        if (d.getTime() === mills)
            return d;
        return Date.create(mills);
    };
    TimepickerComponent.prototype.formatDate = function (value) {
        if (value == null) {
            return null;
        }
        return value.format('{HH}:{mm}');
    };
    TimepickerComponent.prototype.keep = function () {
        this.keepFlag = true;
    };
    TimepickerComponent.prototype.onClick = function ($event) {
        this.popover.open();
    };
    TimepickerComponent.prototype.onFocus = function ($event) {
        this.popover.open();
    };
    TimepickerComponent.prototype.onBlur = function ($event) {
        if (this.keepFlag) {
            $event.target.focus();
            this.keepFlag = false;
        }
        else {
            this.popover.close();
        }
        this.adjustTextValue();
    };
    TimepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-timepicker',
                    template: "\n    <span class=\"text-input-container\">\n      <input type=\"text\" [(ngModel)]=\"textValue\"\n        [class.invalid]=\"isInvalid()\"\n        [disabled]=\"readonly\"\n        [placeholder]=\"placeholder\"\n        #popover=\"cPopover\"\n        [cPopover]=\"popoverTpl\"\n        (focus)=\"onFocus($event); focus.next($event)\"\n        (blur)=\"onBlur($event); blur.next($event)\"\n        (click)=\"onClick($event)\"\n      ><span class=\"text-input-icon fa fa-clock-o\"\n      ></span><span class=\"invalid-text-format glyphicon glyphicon-warning-sign\"\n        [class.active]=\"isInvalidText()\"\n      ></span>\n    </span>\n    <ng-template #popoverTpl>\n      <div class=\"c-timepicker-popover\" (mousedown)=\"keep($event)\">\n        <timepicker [(ngModel)]=\"timepickerValue\"\n          [arrowkeys]=\"true\"\n          [mousewheel]=\"false\"\n          [showSpinners]=\"true\"\n          [showMeridian]=\"false\"\n          [hourStep]=\"stepHour\"\n          [minuteStep]=\"stepMinute\"\n          [min]=\"min\"\n          [max]=\"max\"\n        ></timepicker>\n      </div>\n    </ng-template>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TimepickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TimepickerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    TimepickerComponent.propDecorators = {
        defaultDate: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        stepHour: [{ type: Input }],
        stepMinute: [{ type: Input }],
        placeholder: [{ type: Input }],
        strictType: [{ type: Input }],
        popover: [{ type: ViewChild, args: ['popover',] }]
    };
    return TimepickerComponent;
}(FormItem));
export { TimepickerComponent };
//# sourceMappingURL=timepicker.component.js.map