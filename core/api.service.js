import { EMPTY as empty } from "rxjs";
import { tap, map } from 'rxjs/operators';
import { Injectable, Inject, Pipe, Optional, InjectionToken } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "../ui/alert.service";
var MessageConfig = /** @class */ (function () {
    function MessageConfig() {
    }
    return MessageConfig;
}());
export { MessageConfig };
export var MESSAGE_CONFIG = new InjectionToken('MessageConfig');
export var REQUEST_HOOK = new InjectionToken('RequestHook');
var Api = /** @class */ (function () {
    function Api(http, alert, messages, requestHooks) {
        this.http = http;
        this.alert = alert;
        this.messages = messages;
        this.requestHooks = requestHooks;
        this.headers = [];
        this.requestHooks = this.requestHooks || [];
    }
    Api.prototype.header = function (name, value) {
        var api = new Api(this.http, this.alert, this.messages, this.requestHooks);
        api.headers = this.headers.clone().add({ name: name, value: value });
        return api;
    };
    Api.prototype.submit = function (url, form) {
        var _this = this;
        if (form instanceof AbstractControl) {
            this.alert.onSubmitForm();
        }
        form = form instanceof AbstractControl ? form : { value: form, invalid: false, get: function (key) { return null; } };
        if (form.invalid) {
            this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。', null, { lifetime: 3000 });
            return empty;
        }
        var headers = this.headers.reduce(function (headers, h) {
            headers[h.name] = h.value;
            return headers;
        }, { 'Content-Type': 'application/json' });
        var observable = this.http.post(url, form.value, { headers: new HttpHeaders(headers), observe: 'response' });
        observable = this.requestHooks.reduce(function (o, hook) { return hook.apply(url, form, o); }, observable);
        var catcher = tap(null, function (e) {
            if (e == null || e.error == null || !_this.isErrorObject(e.error)) {
                console.error(e);
                _this.alert.danger(_this.messages['internalServerError'] || '500 Internal Server Error');
                throw e;
            }
            var errors = e.error;
            var alertMessages = [];
            Object.keys(errors).forEach(function (key) {
                var violation = errors[key].reduce(function (a, b) { a[b] = true; return a; }, {});
                var ctrl = form.get(key);
                if (ctrl != null) {
                    ctrl.setErrors(violation);
                }
                else {
                    errors[key]
                        .map(function (msg) { return _this.messages[msg] || msg; })
                        .forEach(function (msg) { return alertMessages.push(msg); });
                }
            });
            if (alertMessages.isEmpty()) {
                _this.alert.warning(_this.messages['invalidForm'] || '入力値に問題があります。', null, { lifetime: 3000 });
            }
            else {
                _this.alert.warning(_this.messages['invalidForm'] || '入力値に問題があります。', alertMessages);
            }
            throw e;
        });
        return catcher(observable.pipe(map(function (req, _) { return req.body; })));
    };
    Api.prototype.isErrorObject = function (error) {
        try {
            var keys = Object.keys(error);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (!(error[key] instanceof Array)) {
                    return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Api.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Api.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AlertService },
        { type: MessageConfig, decorators: [{ type: Inject, args: [MESSAGE_CONFIG,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [REQUEST_HOOK,] }] }
    ]; };
    return Api;
}());
export { Api };
// TODO: use Interceptor
var RequestWatcher = /** @class */ (function () {
    function RequestWatcher() {
        this.pendingForms = [];
    }
    RequestWatcher.prototype.apply = function (url, form, observable) {
        var _this = this;
        this.pendingForms.push(form);
        return tap(function (o) { return _this.pendingForms.remove(function (f) { return f === form; }); }, function (e) { return _this.pendingForms.remove(function (f) { return f === form; }); })(observable);
    };
    RequestWatcher.prototype.isSubmitting = function (form) {
        return this.pendingForms.indexOf(form) > -1;
    };
    RequestWatcher.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RequestWatcher.ctorParameters = function () { return []; };
    return RequestWatcher;
}());
export { RequestWatcher };
export var REQUEST_WATCHER = new RequestWatcher();
export function requestWatcherFactory() {
    return REQUEST_WATCHER;
}
var SubmittingPipe = /** @class */ (function () {
    function SubmittingPipe(watcher) {
        this.watcher = watcher;
    }
    SubmittingPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.watcher.isSubmitting(value);
    };
    SubmittingPipe.decorators = [
        { type: Pipe, args: [{ name: 'submitting', pure: false },] },
    ];
    /** @nocollapse */
    SubmittingPipe.ctorParameters = function () { return [
        { type: RequestWatcher }
    ]; };
    return SubmittingPipe;
}());
export { SubmittingPipe };
//# sourceMappingURL=api.service.js.map