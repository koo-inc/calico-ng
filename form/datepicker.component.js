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
import { FormItem } from "./item";
import { PopoverDirective } from "../ui/popover.directive";
var DatepickerComponent = /** @class */ (function (_super) {
    __extends(DatepickerComponent, _super);
    function DatepickerComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.defaultDate = new Date();
        _this.placeholder = '日付';
        _this.strictType = false;
        _this.textChanged = false;
        _this.keepFlag = false;
        return _this;
    }
    Object.defineProperty(DatepickerComponent.prototype, "textValue", {
        get: function () {
            return this.innerTextValue;
        },
        set: function (value) {
            if (value !== this.innerTextValue) {
                this.textChanged = true;
                this.popover.close();
                this.innerTextValue = value;
                var d = this.toDate(this.innerTextValue);
                this.innerDatepickerValue = d;
                this.value = d != null ? this.strictType ? d : d.toISOString() : null;
                this.popover.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.isInvalidText = function () {
        return this.innerTextValue != null && this.innerTextValue != '' && this.datepickerValue == null;
    };
    DatepickerComponent.prototype.adjustTextValue = function () {
        if (!this.textChanged)
            return;
        if (this.datepickerValue != null) {
            this.innerTextValue = this.formatDate(this.datepickerValue);
        }
        this.textChanged = false;
    };
    Object.defineProperty(DatepickerComponent.prototype, "datepickerValue", {
        get: function () {
            return this.innerDatepickerValue;
        },
        set: function (value) {
            if (!Object.isEqual(value, this.innerDatepickerValue)) {
                this.innerDatepickerValue = value;
                this.innerTextValue = this.formatDate(value);
                this.textChanged = false;
                this.value = value != null ? this.strictType ? value : value.toISOString() : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.writeValue = function (value) {
        _super.prototype.writeValue.call(this, value);
        if (value == null || value == '') {
            this.innerTextValue = null;
        }
        else if (Object.isDate(value)) {
            this.innerTextValue = this.formatDate(value);
        }
        else if (!Object.isDate(value)) {
            this.innerTextValue = this.formatDate(this.toDate(value));
        }
        this.textChanged = false;
        if (value == null || value == '') {
            this.innerDatepickerValue = null;
        }
        else if (Object.isDate(value)) {
            this.innerDatepickerValue = value;
        }
        else if (!Object.isDate(value)) {
            this.innerDatepickerValue = this.toDate(value);
        }
    };
    DatepickerComponent.prototype.toDate = function (value) {
        var d = Date.create(value);
        return d.isValid() ? d : null;
    };
    DatepickerComponent.prototype.formatDate = function (value) {
        if (value == null) {
            return null;
        }
        return value.format('{yyyy}/{MM}/{dd}');
    };
    DatepickerComponent.prototype.keep = function () {
        this.keepFlag = true;
    };
    DatepickerComponent.prototype.onClick = function ($event) {
        this.popover.open();
    };
    DatepickerComponent.prototype.onFocus = function ($event) {
        this.popover.open();
    };
    DatepickerComponent.prototype.onBlur = function ($event) {
        if (this.keepFlag) {
            $event.target.focus();
            this.keepFlag = false;
        }
        else {
            this.popover.close();
        }
        this.adjustTextValue();
    };
    DatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-datepicker',
                    template: "\n    <span class=\"text-input-container\">\n      <input type=\"text\" [(ngModel)]=\"textValue\"\n        [class.invalid]=\"isInvalid()\"\n        [disabled]=\"readonly\"\n        [placeholder]=\"placeholder\"\n        #popover=\"cPopover\"\n        [cPopover]=\"popoverTpl\"\n        (focus)=\"onFocus($event); focus.next($event)\"\n        (blur)=\"onBlur($event); blur.next($event)\"\n        (click)=\"onClick($event)\"\n      ><span class=\"text-input-icon fa fa-calendar\"\n      ></span><span class=\"invalid-text-format glyphicon glyphicon-warning-sign\"\n        [class.active]=\"isInvalidText()\"\n      ></span>\n    </span>\n    <ng-template #popoverTpl>\n      <div class=\"c-datepicker-popover\" (mousedown)=\"keep($event)\">\n        <datepicker [(ngModel)]=\"datepickerValue\"\n          [showWeeks]=\"false\"\n          [activeDate]=\"null\"\n          [startingDay]=\"1\"\n          formatDayTitle=\"YYYY\u5E74MM\u6708\"\n          formatMonth=\"MM\u6708\"\n          formatMonthTitle=\"YYYY\u5E74\"\n          formatYear=\"YYYY\u5E74\"\n          [minDate]=\"minDate\"\n          [maxDate]=\"maxDate\"\n        ></datepicker>\n      </div>\n    </ng-template>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return DatepickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DatepickerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    DatepickerComponent.propDecorators = {
        defaultDate: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        placeholder: [{ type: Input }],
        strictType: [{ type: Input }],
        popover: [{ type: ViewChild, args: ['popover',] }]
    };
    return DatepickerComponent;
}(FormItem));
export { DatepickerComponent };
//# sourceMappingURL=datepicker.component.js.map