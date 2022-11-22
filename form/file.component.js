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
import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Media } from "../type/media";
var FileComponent = /** @class */ (function (_super) {
    __extends(FileComponent, _super);
    function FileComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.loading = false;
        return _this;
    }
    Object.defineProperty(FileComponent.prototype, "state", {
        get: function () {
            if (this.loading) {
                return 'loading';
            }
            if (this.value == null) {
                return 'acceptable';
            }
            return 'input';
        },
        enumerable: true,
        configurable: true
    });
    FileComponent.prototype.change = function (input) {
        var _this = this;
        if (input.files == null || input.files.length == 0) {
            this.clearValue();
        }
        else {
            var file = input.files.item(0);
            this.loading = true;
            Media.read(file).then(function (media) {
                _this.loading = false;
                _this.value = media;
            }, function (e) {
                _this.loading = false;
                _this.value = null;
            });
        }
    };
    FileComponent.prototype.clearValue = function () {
        this.value = null;
    };
    FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-file',
                    template: "\n    <span class=\"c-file\" [class.invalid]=\"isInvalid()\">\n      <ng-container [ngSwitch]=\"state\">\n        <ng-container *ngSwitchCase=\"'loading'\">\n          <span class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></span>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"'input'\">\n          <span class=\"filename\">{{value?.meta?.name}}</span>\n          <button type=\"button\" class=\"close\" (click)=\"clearValue()\" *ngIf=\"!readonly\">&times;</button> \n        </ng-container>\n        <ng-container *ngSwitchCase=\"'acceptable'\">\n          <input type=\"file\"\n            [disabled]=\"readonly\"\n            (change)=\"change($event.target)\"\n            (focus)=\"focus.next($event)\"\n            (blur)=\"blur.next($event)\"\n          /> \n        </ng-container>\n      </ng-container>\n      <c-error-tip [for]=\"control\"></c-error-tip>\n    </span>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n    .c-file {\n      display: inline-flex;\n      align-items: center;\n    }\n    .c-file.invalid {\n      background-color: #fdd;\n      border: solid 1px #f00;\n    }\n    .filename {\n      padding-right: 5px;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return FileComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FileComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return FileComponent;
}(FormItem));
export { FileComponent };
//# sourceMappingURL=file.component.js.map