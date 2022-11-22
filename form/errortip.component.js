import { Component, Input, ElementRef, Renderer2, Inject, Injector } from '@angular/core';
import { FormGroupDirective } from "@angular/forms";
import { MESSAGE_CONFIG, MessageConfig } from "../core";
var ErrorTipComponent = /** @class */ (function () {
    function ErrorTipComponent(messages, el, renderer, injector) {
        this.messages = messages;
        this.el = el;
        this.renderer = renderer;
        this.injector = injector;
        this.form = injector.get(FormGroupDirective, null);
    }
    ErrorTipComponent.prototype.ngAfterContentChecked = function () {
        this.renderer.setStyle(this.el.nativeElement, "display", this.display());
    };
    ErrorTipComponent.prototype.display = function () {
        if (!this.excited())
            return "none";
        return "block";
    };
    ErrorTipComponent.prototype.excited = function () {
        return this.form && this.form.submitted && this.getKeys().length > 0;
    };
    ErrorTipComponent.prototype.getKeys = function () {
        if (this.target == null || this.target.errors == null)
            return [];
        return Object.keys(this.target.errors);
    };
    ErrorTipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-error-tip',
                    template: "\n    <div *ngIf=\"excited()\">\n      <div *ngFor=\"let key of getKeys()\">{{messages[key] || key}}</div>\n    </div>\n  ",
                    styles: ["\n    :host {\n      display: block;\n      bottom: calc(100% + 12px);\n      position: absolute;\n      padding: .5em 1em .4em;\n      background-color: #f66;\n      border: 1px solid #f00;\n      border-radius: 5px;\n      color: #fff;\n      z-index: 10;\n      white-space: nowrap;\n    }\n    :host:after, :host:before {\n      content: '';\n      position: absolute;\n      top: 100%;\n      left: 15px;\n      border: solid transparent;\n    }\n    :host:after {\n      margin-left: 1px;\n      border-top-color: #f66;\n      border-width: 7px;\n    }\n    :host:before {\n      border-top-color: #f00;\n      border-width: 8px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    ErrorTipComponent.ctorParameters = function () { return [
        { type: MessageConfig, decorators: [{ type: Inject, args: [MESSAGE_CONFIG,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: Injector }
    ]; };
    ErrorTipComponent.propDecorators = {
        target: [{ type: Input, args: ['for',] }]
    };
    return ErrorTipComponent;
}());
export { ErrorTipComponent };
//# sourceMappingURL=errortip.component.js.map