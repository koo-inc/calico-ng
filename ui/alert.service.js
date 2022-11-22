import { Injectable, Component, Injector, InjectionToken } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { trigger, style, transition, animate, keyframes } from "@angular/animations";
import { randomString } from "../util/string";
import { filter } from "rxjs/operators";
export var ALERT_CONFIG = new InjectionToken('AlertConfig');
var AlertService = /** @class */ (function () {
    function AlertService(injector, router) {
        var _this = this;
        this.injector = injector;
        this.router = router;
        this.messages = {
            'top-left': [],
            'top-right': [],
            'bottom-left': [],
            'bottom-right': [],
        };
        try {
            this.config = this.injector.get(ALERT_CONFIG, {});
        }
        catch (e) {
            console.warn("use ALERT_CONFIG token to provide AlertConfig instead of 'AlertConfig' string.");
            this.config = this.injector.get('AlertConfig', {});
        }
        this.router.events
            .pipe(filter(function (e) { return e instanceof NavigationStart; }))
            .subscribe(function () {
            _this.removeByType.apply(_this, (_this.config.removeTypesOnNavigationStart || ['warning', 'danger']));
        });
    }
    AlertService.prototype.success = function (title, messages, opts) {
        this.addMessage(this.createMessage('success', title, messages, opts));
    };
    AlertService.prototype.info = function (title, messages, opts) {
        this.addMessage(this.createMessage('info', title, messages, opts));
    };
    AlertService.prototype.warning = function (title, messages, opts) {
        this.addMessage(this.createMessage('warning', title, messages, opts));
    };
    AlertService.prototype.danger = function (title, messages, opts) {
        this.addMessage(this.createMessage('danger', title, messages, opts));
    };
    AlertService.prototype.removeByType = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        Object.forEach(this.messages, function (messages) {
            messages.remove(function (e) { return types.indexOf(e.type) != -1; });
        });
    };
    AlertService.prototype.onSubmitForm = function () {
        this.removeByType.apply(this, (this.config.removeTypesOnSubmitForm || ['warning', 'danger']));
    };
    AlertService.prototype.createMessage = function (type, title, messages, opts) {
        var message = Object.assign({}, this.config.common || {}, this.config[type] || {}, opts || {}, { type: type, title: title, messages: messages });
        message.position = this.normalizePosition(message.position);
        message.key = randomString(8);
        message.state = message.position.indexOf('left') != -1 ? 'in-left' : 'in-right';
        return message;
    };
    AlertService.prototype.normalizePosition = function (position) {
        var v = position == null || position.indexOf('bottom') == -1 ? 'top' : 'bottom';
        var h = position == null || position.indexOf('left') == -1 ? 'right' : 'left';
        return v + '-' + h;
    };
    AlertService.prototype.addMessage = function (message) {
        var _this = this;
        if (message.position.indexOf('top') != -1) {
            this.messages[message.position].unshift(message);
        }
        else {
            this.messages[message.position].push(message);
        }
        if (message.lifetime != null && message.lifetime >= 0) {
            setTimeout(function () {
                _this.removeMessage(message);
            }, message.lifetime);
        }
    };
    AlertService.prototype.removeMessage = function (message) {
        this.messages[message.position].remove(function (e) { return e.key == message.key; });
    };
    AlertService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AlertService.ctorParameters = function () { return [
        { type: Injector },
        { type: Router }
    ]; };
    return AlertService;
}());
export { AlertService };
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.identify = function (index, message) {
        return message.key;
    };
    Object.defineProperty(AlertComponent.prototype, "messages", {
        get: function () {
            return this.alertService.messages;
        },
        enumerable: true,
        configurable: true
    });
    AlertComponent.prototype.removeMessage = function (message) {
        this.alertService.removeMessage(message);
    };
    AlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-alert',
                    template: "\n    <div class=\"c-alert\">\n      <ng-container *ngFor=\"let vertical of ['top', 'bottom']\">\n        <ng-container *ngFor=\"let horizontal of ['left', 'right']\">\n          <div class=\"alert-container\" [ngClass]=\"{'top': vertical == 'top', 'bottom': vertical == 'bottom', 'left': horizontal == 'left', 'right': horizontal == 'right'}\">\n            <div *ngFor=\"let message of messages[vertical + '-' + horizontal];trackBy: identify\"\n                 class=\"alert alert-{{message.type}}\"\n                 [@state]=\"message.state\">\n              <a class=\"close\" (click)=\"removeMessage(message)\">\u00D7</a>\n              <span style=\"white-space: pre-wrap\">{{message.title}}</span>\n              <ng-container *ngIf=\"message.messages\">\n                <ul>\n                  <li *ngFor=\"let m of message.messages\">{{m}}</li>\n                </ul>\n              </ng-container>\n            </div>\n          </div>\n        </ng-container>\n      </ng-container>\n    </div>\n  ",
                    styles: ["\n  "],
                    animations: [
                        trigger('state', [
                            transition('void => in-left', [
                                animate(300, keyframes([
                                    style({
                                        height: 0,
                                        padding: 0,
                                        margin: 0,
                                        transform: 'translateX(-100%)',
                                        opacity: 0,
                                        offset: 0,
                                    }),
                                    style({
                                        height: '*',
                                        padding: '*',
                                        margin: '*',
                                        offset: 0.3,
                                    }),
                                    style({
                                        transform: 'translateX(0)',
                                        opacity: 0.9,
                                        offset: 1.0,
                                    }),
                                ]))
                            ]),
                            transition('void => in-right', [
                                animate(300, keyframes([
                                    style({
                                        height: 0,
                                        padding: 0,
                                        margin: 0,
                                        transform: 'translateX(100%)',
                                        opacity: 0,
                                        offset: 0,
                                    }),
                                    style({
                                        height: '*',
                                        padding: '*',
                                        margin: '*',
                                        offset: 0.3,
                                    }),
                                    style({
                                        transform: 'translateX(0)',
                                        opacity: 0.9,
                                        offset: 1.0,
                                    }),
                                ]))
                            ]),
                            transition('* => void', [
                                animate(300, keyframes([
                                    style({
                                        offset: 0,
                                    }),
                                    style({
                                        opacity: 0,
                                        height: '*',
                                        padding: '*',
                                        margin: '*',
                                        offset: 0.7,
                                    }),
                                    style({
                                        height: 0,
                                        padding: 0,
                                        margin: 0,
                                        offset: 1.0,
                                    }),
                                ]))
                            ]),
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    AlertComponent.ctorParameters = function () { return [
        { type: AlertService }
    ]; };
    return AlertComponent;
}());
export { AlertComponent };
//# sourceMappingURL=alert.service.js.map