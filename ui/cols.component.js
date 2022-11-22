import { Component, Input } from '@angular/core';
var ColsComponent = /** @class */ (function () {
    function ColsComponent() {
        this._cols = [];
    }
    Object.defineProperty(ColsComponent.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        set: function (value) {
            if (value == null || !Object.isArray(value) || value.length == 0) {
                this._cols = [];
                return;
            }
            this._cols = value.map(function (e) {
                if (e == null)
                    return '';
                if (Object.isNumber(e))
                    return e + '%';
                return e.toString();
            });
        },
        enumerable: true,
        configurable: true
    });
    ColsComponent.decorators = [
        { type: Component, args: [{
                    selector: '[cCols]',
                    template: "\n    <col *ngFor=\"let col of cols\" [width]=\"col\">\n    <ng-content></ng-content>\n  "
                },] },
    ];
    ColsComponent.propDecorators = {
        cols: [{ type: Input, args: ['cCols',] }]
    };
    return ColsComponent;
}());
export { ColsComponent };
//# sourceMappingURL=cols.component.js.map