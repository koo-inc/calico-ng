import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
var FontAwesomeDirective = /** @class */ (function () {
    function FontAwesomeDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        renderer.addClass(el.nativeElement, "fa");
    }
    FontAwesomeDirective.prototype.ngOnInit = function () {
        if (this.fontAwesome == null)
            return;
        if (this.fontAwesome.match(/^\s*$/))
            return;
        this.renderer.addClass(this.el.nativeElement, "fa-" + this.fontAwesome.trim());
    };
    FontAwesomeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cFontAwesome]',
                },] },
    ];
    /** @nocollapse */
    FontAwesomeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FontAwesomeDirective.propDecorators = {
        fontAwesome: [{ type: Input, args: ['cFontAwesome',] }]
    };
    return FontAwesomeDirective;
}());
export { FontAwesomeDirective };
//# sourceMappingURL=font-awesome.directive.js.map