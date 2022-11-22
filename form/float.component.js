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
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormattedTextFormItem } from "./item";
var FloatComponent = /** @class */ (function (_super) {
    __extends(FloatComponent, _super);
    function FloatComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.step = 0.1;
        _this.allowNegative = false;
        _this.formatErrorMessage = '正しい数値の形式ではありません。';
        return _this;
    }
    FloatComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.placeholder == null) {
            this.placeholder = '数値({0}単位)'.format(this.step);
        }
        if (this.step != null) {
            if (this.step.toString().match(/\.[0-9]{3,}$/)) {
                throw new Error('stepは少数2桁までしか指定できません。');
            }
        }
    };
    FloatComponent.prototype.validFormat = function (textValue) {
        if (textValue == null || textValue.isBlank()) {
            return true;
        }
        var regexCheck;
        if (this.allowNegative) {
            regexCheck = textValue.hankaku().trim().match(/^-?[0-9,]+(\.[0-9]{1,2})?$/) != null;
        }
        else {
            regexCheck = textValue.hankaku().trim().match(/^[0-9,]+(\.[0-9]{1,2})?$/) != null;
        }
        if (!regexCheck)
            return false;
        var val = textValue.trim().hankaku().removeAll(',').toNumber();
        return (val * 1000) % (this.step * 1000) == 0;
    };
    FloatComponent.prototype.toVal = function (textValue) {
        if (textValue == null || textValue.isBlank() || !this.validFormat(textValue)) {
            return null;
        }
        return textValue.trim().hankaku().removeAll(',').toNumber();
    };
    FloatComponent.prototype.formatVal = function (value) {
        return value == null ? '' : value.format();
    };
    FloatComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-float',
                    template: "\n    <span class=\"text-input-container\">\n      <input type=\"text\" [(ngModel)]=\"textValue\"\n        [class.invalid]=\"isInvalid()\"\n        [disabled]=\"readonly\"\n        [placeholder]=\"placeholder\"\n        (blur)=\"formatTextValue(); blur.next($event)\"\n        (focus)=\"focus.next($event)\"\n      ><span class=\"text-input-icon fa fa-calculator\"\n      ></span><span class=\"invalid-text-format glyphicon glyphicon-warning-sign\"\n        [class.active]=\"textValueInvalid\"\n      ></span>\n    </span>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return FloatComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FloatComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    FloatComponent.propDecorators = {
        placeholder: [{ type: Input }],
        step: [{ type: Input }],
        allowNegative: [{ type: Input }]
    };
    return FloatComponent;
}(FormattedTextFormItem));
export { FloatComponent };
//# sourceMappingURL=float.component.js.map