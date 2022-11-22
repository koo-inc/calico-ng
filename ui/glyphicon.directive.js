import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
var GlyphiconDirective = /** @class */ (function () {
    function GlyphiconDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        renderer.addClass(el.nativeElement, "glyphicon");
    }
    GlyphiconDirective.prototype.ngOnInit = function () {
        if (this.glyphicon == null)
            return;
        if (this.glyphicon.match(/^\s*$/))
            return;
        this.renderer.addClass(this.el.nativeElement, "glyphicon-" + this.glyphicon.trim());
    };
    GlyphiconDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cGlyphicon]',
                },] },
    ];
    /** @nocollapse */
    GlyphiconDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    GlyphiconDirective.propDecorators = {
        glyphicon: [{ type: Input, args: ['cGlyphicon',] }]
    };
    return GlyphiconDirective;
}());
export { GlyphiconDirective };
//# sourceMappingURL=glyphicon.directive.js.map