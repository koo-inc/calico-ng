import { Component, Input } from "@angular/core";
var ErrorTipContainerComponent = /** @class */ (function () {
    function ErrorTipContainerComponent() {
    }
    Object.defineProperty(ErrorTipContainerComponent.prototype, "target", {
        get: function () {
            return this.control || this.attrControl;
        },
        enumerable: true,
        configurable: true
    });
    ErrorTipContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-error-tip-container,[cErrorTipContainer]',
                    template: "\n    <ng-content></ng-content>\n    <c-error-tip [for]=\"target\"></c-error-tip>\n  ",
                    styles: ["\n    :host(c-form-container) {\n      display: block;\n    }\n    :host {\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    exportAs: 'cErrorTipContainer',
                },] },
    ];
    /** @nocollapse */
    ErrorTipContainerComponent.ctorParameters = function () { return []; };
    ErrorTipContainerComponent.propDecorators = {
        control: [{ type: Input, args: ['for',] }],
        attrControl: [{ type: Input, args: ['cErrorTipContainer',] }]
    };
    return ErrorTipContainerComponent;
}());
export { ErrorTipContainerComponent };
//# sourceMappingURL=errortip-container.component.js.map