import { Injectable, InjectionToken, Injector } from '@angular/core';
import { SerializeService } from "./serialize.service";
export var SESSION_STORAGE_SERVICE_CONFIG = new InjectionToken('SessionStorageServiceConfig');
var SessionStorageService = /** @class */ (function () {
    function SessionStorageService(serializeService, injector) {
        this.serializeService = serializeService;
        var config;
        try {
            config = injector.get(SESSION_STORAGE_SERVICE_CONFIG);
        }
        catch (e) {
            console.warn("use SESSION_STORAGE_SERVICE_CONFIG token to provide SessionStorageServiceConfig instead of 'SessionStorageServiceConfig' string.");
            config = injector.get("SessionStorageServiceConfig", null);
        }
        if (config != null) {
            this.sessionStorage = config.storage;
            this.prefix = config.prefix;
            this.version = config.version;
        }
        if (this.sessionStorage == null && 'sessionStorage' in window) {
            this.sessionStorage = sessionStorage;
        }
        else {
            throw new Error("this browser doesn't support Session Storage.");
        }
        if (this.prefix == null) {
            this.prefix = '';
        }
        if (this.version == null) {
            this.version = Date.now() + '';
        }
    }
    SessionStorageService.prototype.store = function (key, value, withVersion) {
        key = this.createKey(key, withVersion);
        this.sessionStorage.setItem(key, this.serializeService.serialize(value));
    };
    SessionStorageService.prototype.restore = function (key, withVersion) {
        return this.serializeService.deserialize(this.restoreRawData(key, withVersion));
    };
    SessionStorageService.prototype.restoreRawData = function (key, withVersion) {
        key = this.createKey(key, withVersion);
        return this.sessionStorage.getItem(key);
    };
    SessionStorageService.prototype.remove = function (key, withVersion) {
        key = this.createKey(key, withVersion);
        this.sessionStorage.removeItem(key);
    };
    SessionStorageService.prototype.clear = function (matchKey, withVersion) {
        matchKey = this.createKey(matchKey == null ? '' : matchKey, withVersion);
        this.removeMatched(matchKey);
    };
    SessionStorageService.prototype.clearByVersion = function (version) {
        this.removeMatched(this.prefix + version + '-');
    };
    SessionStorageService.prototype.keyPrefix = function (withVersion) {
        return withVersion === true ? this.prefix + this.version + '-' : this.prefix;
    };
    SessionStorageService.prototype.createKey = function (key, withVersion) {
        return this.keyPrefix(withVersion) + key;
    };
    SessionStorageService.prototype.removeMatched = function (matchKey) {
        var _this = this;
        if (matchKey == '') {
            this.sessionStorage.clear();
            return;
        }
        var keys = [];
        for (var i = 0; i < this.sessionStorage.length; i++) {
            keys.push(this.sessionStorage.key(i));
        }
        keys.forEach(function (key) {
            if (key.startsWith(matchKey)) {
                _this.sessionStorage.removeItem(key);
            }
        });
    };
    SessionStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SessionStorageService.ctorParameters = function () { return [
        { type: SerializeService },
        { type: Injector }
    ]; };
    return SessionStorageService;
}());
export { SessionStorageService };
//# sourceMappingURL=session-storage.service.js.map