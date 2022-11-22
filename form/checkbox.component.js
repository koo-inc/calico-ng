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
import { FormItem } from "./item";
var CheckboxComponent = /** @class */ (function (_super) {
    __extends(CheckboxComponent, _super);
    function CheckboxComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.trueValue = true;
        _this.falseValue = false;
        _this.innerChecked = false;
        return _this;
    }
    Object.defineProperty(CheckboxComponent.prototype, "checked", {
        get: function () {
            return this.innerChecked;
        },
        set: function (checked) {
            if (checked !== this.checked) {
                this.innerChecked = checked;
                this.value = checked ? this.trueValue : this.falseValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    CheckboxComponent.prototype.writeValue = function (value) {
        _super.prototype.writeValue.call(this, value);
        this.checked = value == this.trueValue;
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-checkbox',
                    template: "\n    <button type=\"button\" class=\"btn btn-default c-checkbox\"\n      [class.invalid]=\"isInvalid()\"\n      [disabled]=\"readonly\"\n      (click)=\"toggle()\"\n    ><span *ngIf=\"checked\" class=\"fa fa-check-square fa-fw\"></span><span *ngIf=\"!checked\" class=\"fa fa-square-o fa-fw\"></span>{{label}}</button>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CheckboxComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    CheckboxComponent.propDecorators = {
        label: [{ type: Input }],
        trueValue: [{ type: Input }],
        falseValue: [{ type: Input }]
    };
    return CheckboxComponent;
}(FormItem));
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map