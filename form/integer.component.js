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
var IntegerComponent = /** @class */ (function (_super) {
    __extends(IntegerComponent, _super);
    function IntegerComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.placeholder = '数値';
        _this.allowNegative = false;
        _this.separation = true;
        _this.formatErrorMessage = '正しい数値の形式ではありません。';
        return _this;
    }
    IntegerComponent.prototype.validFormat = function (textValue) {
        if (textValue == null || textValue.isBlank()) {
            return true;
        }
        if (this.allowNegative) {
            return textValue.hankaku().trim().match(/^-?[0-9,]+$/) != null;
        }
        else {
            return textValue.hankaku().trim().match(/^[0-9,]+$/) != null;
        }
    };
    IntegerComponent.prototype.toVal = function (textValue) {
        if (textValue == null || textValue.isBlank() || !this.validFormat(textValue)) {
            return null;
        }
        return textValue.trim().hankaku().toNumber();
    };
    IntegerComponent.prototype.formatVal = function (value) {
        return value == null ? '' : this.separation ? value.format() : value.toString();
    };
    IntegerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-integer',
                    template: "\n    <span class=\"text-input-container\">\n      <input type=\"text\" [(ngModel)]=\"textValue\"\n        [class.invalid]=\"isInvalid()\"\n        [disabled]=\"readonly\"\n        [placeholder]=\"placeholder\"\n        (blur)=\"formatTextValue(); blur.next($event)\"\n        (focus)=\"focus.next($event)\"\n      ><span class=\"text-input-icon fa fa-calculator\"\n      ></span><span class=\"invalid-text-format glyphicon glyphicon-warning-sign\"\n        [class.active]=\"textValueInvalid\"\n      ></span>\n    </span>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return IntegerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    IntegerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    IntegerComponent.propDecorators = {
        placeholder: [{ type: Input }],
        allowNegative: [{ type: Input }],
        separation: [{ type: Input }]
    };
    return IntegerComponent;
}(FormattedTextFormItem));
export { IntegerComponent };
//# sourceMappingURL=integer.component.js.map