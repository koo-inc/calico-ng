import { Component, Input } from "@angular/core";
import { SearchContext } from "./search.service";
var SortComponent = /** @class */ (function () {
    function SortComponent(searchContext) {
        this.searchContext = searchContext;
    }
    SortComponent.prototype.onClick = function () {
        this.searchContext.onSortChange(this.prop);
    };
    SortComponent.prototype.isAsc = function () {
        if (this.searchContext.form.value._sort == null)
            return false;
        return this.searchContext.form.value._sort.prop == this.prop && this.searchContext.form.value._sort.type == 'ASC';
    };
    SortComponent.prototype.isDesc = function () {
        if (this.searchContext.form.value._sort == null)
            return false;
        return this.searchContext.form.value._sort.prop == this.prop && this.searchContext.form.value._sort.type == 'DESC';
    };
    SortComponent.decorators = [
        { type: Component, args: [{
                    selector: '[cSort]',
                    template: "\n    <div class=\"c-sort\"\n      (click)=\"onClick()\">\n      <ng-content></ng-content>\n      <span *ngIf=\"isAsc()\" class=\"active\" class=\"fa fa-sort-asc\"></span>\n      <span *ngIf=\"isDesc()\" class=\"active\" class=\"fa fa-sort-desc\"></span>\n      <span *ngIf=\"!isAsc() && !isDesc()\" class=\"fa fa-sort\"></span>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SortComponent.ctorParameters = function () { return [
        { type: SearchContext }
    ]; };
    SortComponent.propDecorators = {
        prop: [{ type: Input, args: ['cSort',] }]
    };
    return SortComponent;
}());
export { SortComponent };
//# sourceMappingURL=sort.component.js.map