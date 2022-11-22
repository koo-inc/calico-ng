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
var TextareaComponent = /** @class */ (function (_super) {
    __extends(TextareaComponent, _super);
    function TextareaComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.placeholder = '';
        return _this;
    }
    TextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-textarea',
                    template: "\n    <textarea class=\"c-textarea\" [(ngModel)]=\"value\"\n      [class.invalid]=\"isInvalid()\"\n      [disabled]=\"readonly\"\n      [placeholder]=\"placeholder\"\n      (focus)=\"focus.next($event)\"\n      (blur)=\"blur.next($event)\"\n      cols=\"30\"\n      rows=\"10\"\n    ></textarea>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TextareaComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    TextareaComponent.propDecorators = {
        placeholder: [{ type: Input }]
    };
    return TextareaComponent;
}(FormItem));
export { TextareaComponent };
//# sourceMappingURL=textarea.component.js.map