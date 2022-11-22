import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
var ListTableDirective = /** @class */ (function () {
    function ListTableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.hover = true;
        this.striped = true;
        this.toggleClass("table", true);
        this.toggleClass("table-bordered", true);
        this.toggleClass("table-list", true);
    }
    ListTableDirective.prototype.ngOnInit = function () {
        this.toggleClass("table-hover", this.hover);
        this.toggleClass("table-striped", this.striped);
    };
    ListTableDirective.prototype.ngOnChanges = function (changes) {
        this.toggleClass("table-hover", this.hover);
        this.toggleClass("table-striped", this.striped);
    };
    ListTableDirective.prototype.toggleClass = function (className, enabled) {
        if (enabled) {
            this.renderer.addClass(this.el.nativeElement, className);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, className);
        }
    };
    ListTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cListTable]'
                },] },
    ];
    /** @nocollapse */
    ListTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ListTableDirective.propDecorators = {
        hover: [{ type: Input }],
        striped: [{ type: Input }]
    };
    return ListTableDirective;
}());
export { ListTableDirective };
var InfoTableDirective = /** @class */ (function () {
    function InfoTableDirective(el, renderer) {
        renderer.addClass(el.nativeElement, "table");
        renderer.addClass(el.nativeElement, "table-bordered");
        renderer.addClass(el.nativeElement, "table-info");
    }
    InfoTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cInfoTable]'
                },] },
    ];
    /** @nocollapse */
    InfoTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return InfoTableDirective;
}());
export { InfoTableDirective };
//# sourceMappingURL=table.directive.js.map