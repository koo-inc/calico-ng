import { Component, Input, ContentChild } from '@angular/core';
var PanelHeaderComponent = /** @class */ (function () {
    function PanelHeaderComponent() {
    }
    PanelHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-panel-header',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return PanelHeaderComponent;
}());
export { PanelHeaderComponent };
var PanelFooterComponent = /** @class */ (function () {
    function PanelFooterComponent() {
    }
    PanelFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-panel-footer',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return PanelFooterComponent;
}());
export { PanelFooterComponent };
var PanelComponent = /** @class */ (function () {
    function PanelComponent() {
    }
    Object.defineProperty(PanelComponent.prototype, "showHeader", {
        get: function () {
            return this.header != null || this.heading != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "showFooter", {
        get: function () {
            return this.footer != null;
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-panel',
                    template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\" *ngIf=\"showHeader\">\n        {{heading}}\n        <ng-content select=\"c-panel-header\"></ng-content>\n      </div>\n      <div class=\"panel-body\">\n        <ng-content></ng-content>\n      </div>\n      <div class=\"panel-footer\" *ngIf=\"showFooter\">\n        <ng-content select=\"c-panel-footer\"></ng-content>\n      </div>\n    </div>\n  "
                },] },
    ];
    PanelComponent.propDecorators = {
        heading: [{ type: Input }],
        header: [{ type: ContentChild, args: [PanelHeaderComponent,] }],
        footer: [{ type: ContentChild, args: [PanelFooterComponent,] }]
    };
    return PanelComponent;
}());
export { PanelComponent };
//# sourceMappingURL=panel.component.js.map