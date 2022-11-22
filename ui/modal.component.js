import { Component, Input, ContentChild, ViewChild, EventEmitter, Output, ElementRef, Inject } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { DOCUMENT } from "@angular/platform-browser";
var ModalHeaderComponent = /** @class */ (function () {
    function ModalHeaderComponent() {
    }
    ModalHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-modal-header',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return ModalHeaderComponent;
}());
export { ModalHeaderComponent };
var ModalFooterComponent = /** @class */ (function () {
    function ModalFooterComponent() {
    }
    ModalFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-modal-footer',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return ModalFooterComponent;
}());
export { ModalFooterComponent };
var ModalComponent = /** @class */ (function () {
    function ModalComponent(doc, elem) {
        var _this = this;
        this.doc = doc;
        this.elem = elem;
        this.closeButton = true;
        this.backdrop = true;
        this.ignoreBackdropClick = false;
        this.keyboard = true;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.shown = false;
        this.view = doc.defaultView || {
            addEventListener: function (type, listener, useCapture) { },
            removeEventListener: function (type, listener, useCapture) { },
        };
        this.focusListener = function (e) {
            var having = _this.having([_this.elem.nativeElement], e.target);
            if (!having) {
                _this.elem.nativeElement.firstElementChild.focus();
            }
        };
    }
    ModalComponent.prototype.toggle = function () {
        this.modalDirective.toggle();
    };
    ModalComponent.prototype.show = function () {
        this.modalDirective.show();
    };
    ModalComponent.prototype.hide = function (event) {
        this.modalDirective.hide(event);
    };
    ModalComponent.prototype._innerOnShow = function (event) {
        this.shown = true;
        this.onShow.emit(event);
    };
    ModalComponent.prototype._innerOnHidden = function (event) {
        this.shown = false;
        this.onHide.emit(event);
    };
    Object.defineProperty(ModalComponent.prototype, "showHeader", {
        get: function () {
            return this.header != null || this.heading != null || this.closeButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "showFooter", {
        get: function () {
            return this.footer != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "isSmall", {
        get: function () {
            if (this.size == null)
                return false;
            return this.size.indexOf('sm') != -1 || this.size.indexOf('small') != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "isLarge", {
        get: function () {
            if (this.size == null)
                return false;
            return this.size.indexOf('lg') != -1 || this.size.indexOf('large') != -1;
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnInit = function () {
        this.view.addEventListener('focus', this.focusListener, true);
    };
    ModalComponent.prototype.having = function (elements, target) {
        if (elements == null)
            return false;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (target === element) {
                return true;
            }
            if (this.having(element.children, target)) {
                return true;
            }
        }
        return false;
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-modal',
                    template: "\n    <div bsModal #modal=\"bs-modal\"\n        [config]=\"{backdrop: backdrop, ignoreBackdropClick: ignoreBackdropClick, keyboard: keyboard}\"\n        (onShow)=\"_innerOnShow($event)\"\n        (onHidden)=\"_innerOnHidden($event)\"\n        class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n      <div class=\"modal-dialog\" [class.modal-sm]=\"isSmall\" [class.modal-lg]=\"isLarge\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\" *ngIf=\"showHeader\">\n            <button *ngIf=\"closeButton\" type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modal.hide()\"><span>&times;</span></button>\n            {{heading}}\n            <ng-content select=\"c-modal-header\"></ng-content>\n          </div>\n          <div class=\"modal-body\">\n            <ng-content></ng-content>\n          </div>\n          <div class=\"modal-footer\" *ngIf=\"showFooter\">\n            <ng-content select=\"c-modal-footer\"></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef }
    ]; };
    ModalComponent.propDecorators = {
        heading: [{ type: Input }],
        size: [{ type: Input }],
        closeButton: [{ type: Input }],
        backdrop: [{ type: Input }],
        ignoreBackdropClick: [{ type: Input }],
        keyboard: [{ type: Input }],
        onShow: [{ type: Output }],
        onHide: [{ type: Output }],
        modalDirective: [{ type: ViewChild, args: [ModalDirective,] }],
        header: [{ type: ContentChild, args: [ModalHeaderComponent,] }],
        footer: [{ type: ContentChild, args: [ModalFooterComponent,] }]
    };
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map