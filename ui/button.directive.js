import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
var ButtonDirective = /** @class */ (function () {
    function ButtonDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        renderer.addClass(el.nativeElement, "btn");
    }
    ButtonDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.buttonType == null)
            return;
        this.buttonType.split(/[,\s]+/).forEach(function (type) {
            if (type.trim() == null)
                return;
            _this.renderer.addClass(_this.el.nativeElement, "btn-" + type.trim());
        });
    };
    ButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cBtn]',
                },] },
    ];
    /** @nocollapse */
    ButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ButtonDirective.propDecorators = {
        buttonType: [{ type: Input, args: ['cBtn',] }]
    };
    return ButtonDirective;
}());
export { ButtonDirective };
//# sourceMappingURL=button.directive.js.map