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
import { Component, forwardRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
var TextFieldComponent = /** @class */ (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.placeholder = '';
        _this.cEnter = new EventEmitter();
        return _this;
    }
    TextFieldComponent.prototype.fireEnter = function ($event) {
        if ($event.keyCode == 13) {
            this.cEnter.next($event);
        }
    };
    TextFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-textfield',
                    template: "\n    <input type=\"text\" class=\"c-textfield\" [(ngModel)]=\"value\"\n      [class.invalid]=\"isInvalid()\"\n      [disabled]=\"readonly\"\n      [placeholder]=\"placeholder\"\n      (focus)=\"focus.next($event)\"\n      (blur)=\"blur.next($event)\"\n      (keydown)=\"fireEnter($event)\"\n    />\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TextFieldComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TextFieldComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    TextFieldComponent.propDecorators = {
        placeholder: [{ type: Input }],
        cEnter: [{ type: Output }]
    };
    return TextFieldComponent;
}(FormItem));
export { TextFieldComponent };
//# sourceMappingURL=textfield.component.js.map