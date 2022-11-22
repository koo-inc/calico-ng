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
import { Input, Output, EventEmitter } from '@angular/core';
import { FormControlName, NgControl } from "@angular/forms";
var noop = function () { };
var ɵ0 = noop;
var valueOf = function (val) { return val != null ? val.valueOf() : val; };
var ɵ1 = valueOf;
var FormItem = /** @class */ (function () {
    function FormItem(injector) {
        this.injector = injector;
        this.readonly = false;
        this.cChange = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    FormItem.prototype.ngOnInit = function () {
        this.control = this.injector.get(NgControl, null);
        if (this.control == null) {
            this.writeValue(this.inputValue);
        }
    };
    FormItem.prototype.ngOnChanges = function (changes) {
        if ('inputValue' in changes) {
            this.value = changes['inputValue'].currentValue;
        }
    };
    Object.defineProperty(FormItem.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (value) {
            if (valueOf(value) !== valueOf(this.innerValue)) {
                this.innerValue = value;
                this.onChangeCallback(value);
                this.cChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    FormItem.prototype.writeValue = function (value) {
        if (valueOf(value) !== valueOf(this.innerValue)) {
            this.innerValue = value;
        }
    };
    FormItem.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    FormItem.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    FormItem.prototype.isInvalid = function () {
        return this.control && this.control.invalid
            && (!(this.control instanceof FormControlName) || this.control.formDirective.submitted);
    };
    FormItem.prototype.addError = function (key) {
        if (this.control == null)
            return;
        var errors = this.control.control.errors || {};
        errors[key] = true;
        this.control.control.setErrors(errors);
    };
    FormItem.prototype.removeError = function (key) {
        if (this.control == null)
            return;
        var errors = this.control.control.errors || {};
        errors = Object.exclude(errors, function (v, k) { return k == key; });
        if (Object.keys(errors).length == 0) {
            errors = null;
        }
        this.control.control.setErrors(errors);
    };
    FormItem.propDecorators = {
        readonly: [{ type: Input }],
        inputValue: [{ type: Input, args: ["value",] }],
        cChange: [{ type: Output }],
        focus: [{ type: Output }],
        blur: [{ type: Output }]
    };
    return FormItem;
}());
export { FormItem };
var FormattedTextFormItem = /** @class */ (function (_super) {
    __extends(FormattedTextFormItem, _super);
    function FormattedTextFormItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textValueInvalid = false;
        _this.textValueChanged = false;
        return _this;
    }
    Object.defineProperty(FormattedTextFormItem.prototype, "textValue", {
        get: function () {
            return this.innerTextValue;
        },
        set: function (value) {
            if (value !== this.innerTextValue) {
                this.innerTextValue = value;
                this.textValueInvalid = !this.validFormat(value);
                this.textValueChanged = true;
                this.value = this.toVal(value);
                this.setFormatError();
            }
        },
        enumerable: true,
        configurable: true
    });
    FormattedTextFormItem.prototype.formatTextValue = function () {
        if (!this.textValueChanged)
            return;
        if (this.value == null)
            return;
        this.innerTextValue = this.formatVal(this.value);
        this.textValueChanged = false;
    };
    FormattedTextFormItem.prototype.setFormatError = function () {
        if (this.textValueInvalid) {
            this.addError(this.formatErrorMessage);
        }
        else {
            this.removeError(this.formatErrorMessage);
        }
    };
    FormattedTextFormItem.prototype.writeValue = function (value) {
        var _this = this;
        _super.prototype.writeValue.call(this, value);
        this.innerTextValue = this.formatVal(value);
        this.textValueInvalid = !this.validFormat(this.innerTextValue);
        this.textValueChanged = false;
        setTimeout(function () {
            _this.setFormatError();
        });
    };
    return FormattedTextFormItem;
}(FormItem));
export { FormattedTextFormItem };
export { ɵ0, ɵ1 };
//# sourceMappingURL=item.js.map