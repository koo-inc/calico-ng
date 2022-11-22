import { ViewContainerRef, ElementRef, Directive, Input, Output, Renderer2, EventEmitter } from "@angular/core";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";
import { PopoverConfig } from "ngx-bootstrap/popover";
import { PopoverDirective as NgPopoverDirective } from "ngx-bootstrap/popover";
var PopoverListener = /** @class */ (function () {
    function PopoverListener() {
        this.popovers = [];
        this._triggerEvents = ['focus', 'mousedown', 'touchstart', 'click'];
        this._listener = (function (e) {
            for (var i = this.popovers.length - 1; i >= 0; i--) {
                var removed = this.popovers[i]._removeIfNotHaving(e.target);
                if (removed == null) {
                    return;
                }
            }
        }).throttle(500).bind(this);
    }
    PopoverListener.prototype.attach = function (popover) {
        var _this = this;
        setTimeout(function () {
            if (_this.popovers.length == 0) {
                _this._triggerEvents.forEach(function (e) {
                    window.addEventListener(e, _this._listener, false);
                });
            }
            _this.popovers.push(popover);
        }, 0);
    };
    PopoverListener.prototype.detach = function (popover) {
        var _this = this;
        var i = this.popovers.indexOf(popover);
        if (i < 0)
            return;
        this.popovers.length = i;
        if (this.popovers.length == 0) {
            this._triggerEvents.forEach(function (e) {
                window.removeEventListener(e, _this._listener, false);
            });
        }
    };
    PopoverListener.prototype.clear = function () {
        for (var i = this.popovers.length - 1; i >= 0; i--) {
            this.popovers[i].close();
        }
    };
    return PopoverListener;
}());
var listener = new PopoverListener();
var PopoverDirective = /** @class */ (function () {
    function PopoverDirective(elementRef, renderer, viewContainerRef, cis) {
        this.elementRef = elementRef;
        this.beforeCloseEv = new EventEmitter();
        this.closeEv = new EventEmitter();
        this.beforeOpenEv = new EventEmitter();
        this.openEv = new EventEmitter();
        var config = new PopoverConfig();
        config.container = 'body';
        config.placement = 'bottom';
        config.triggers = '';
        this.popover = new NgPopoverDirective(elementRef, renderer, viewContainerRef, config, cis);
    }
    Object.defineProperty(PopoverDirective.prototype, "cPopover", {
        set: function (popover) {
            this.popover.popover = popover;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        get: function () {
            return this.popover.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    PopoverDirective.prototype.open = function () {
        if (!this.isOpen) {
            this.beforeOpenEv.emit();
            this.popover.show();
            var lastPopover = listener.popovers.last();
            if (lastPopover != null && !lastPopover.having(this.elementRef.nativeElement)) {
                listener.clear();
            }
            listener.attach(this);
            this.openEv.emit();
        }
    };
    PopoverDirective.prototype.close = function () {
        if (this.isOpen) {
            this.beforeCloseEv.emit();
            this.popover.hide();
            listener.detach(this);
            this.closeEv.emit();
        }
    };
    PopoverDirective.prototype.toggle = function () {
        if (this.isOpen) {
            return this.close();
        }
        this.open();
    };
    PopoverDirective.prototype.ngOnDestroy = function () {
        this.close();
        listener.detach(this);
    };
    Object.defineProperty(PopoverDirective.prototype, "popoverContent", {
        get: function () {
            return this.popover['_popover']['_componentRef']['_viewRef']['rootNodes'][0];
        },
        enumerable: true,
        configurable: true
    });
    PopoverDirective.prototype._removeIfNotHaving = function (elm) {
        if (!this.having(elm)) {
            this.close();
            return this;
        }
        return null;
    };
    PopoverDirective.prototype.having = function (target) {
        return this._having([this.elementRef.nativeElement].concat(this.popoverContent), target);
    };
    PopoverDirective.prototype._having = function (elements, target) {
        if (elements == null)
            return false;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (target === element) {
                return true;
            }
            if (this._having(element.children, target)) {
                return true;
            }
        }
        return false;
    };
    PopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cPopover]',
                    exportAs: 'cPopover',
                },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef },
        { type: ComponentLoaderFactory }
    ]; };
    PopoverDirective.propDecorators = {
        cPopover: [{ type: Input }],
        beforeCloseEv: [{ type: Output, args: ['beforeClose',] }],
        closeEv: [{ type: Output, args: ['close',] }],
        beforeOpenEv: [{ type: Output, args: ['beforeOpen',] }],
        openEv: [{ type: Output, args: ['open',] }]
    };
    return PopoverDirective;
}());
export { PopoverDirective };
//# sourceMappingURL=popover.directive.js.map