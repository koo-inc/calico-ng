import { Injectable, InjectionToken, Injector } from '@angular/core';
import { SerializeService } from "./serialize.service";
export var LOCAL_STORAGE_SERVICE_CONFIG = new InjectionToken('LocalStorageServiceConfig');
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(serializeService, injector) {
        this.serializeService = serializeService;
        var config;
        try {
            config = injector.get(LOCAL_STORAGE_SERVICE_CONFIG);
        }
        catch (e) {
            console.warn("use LOCAL_STORAGE_SERVICE_CONFIG token to provide LocalStorageServiceConfig instead of 'LocalStorageServiceConfig' string.");
            config = injector.get("LocalStorageServiceConfig", null);
        }
        if (config != null) {
            this.localStorage = config.storage;
            this.prefix = config.prefix;
            this.version = config.version;
        }
        if (this.localStorage == null && 'localStorage' in global) {
            this.localStorage = localStorage;
        }
        else {
            throw new Error("this browser doesn't support Local Storage.");
        }
        if (this.prefix == null) {
            this.prefix = '';
        }
        if (this.version == null) {
            this.version = Date.now() + '';
        }
    }
    LocalStorageService.prototype.store = function (key, value, withVersion) {
        key = this.createKey(key, withVersion);
        this.localStorage.setItem(key, this.serializeService.serialize(value));
    };
    LocalStorageService.prototype.restore = function (key, withVersion) {
        return this.serializeService.deserialize(this.restoreRawData(key, withVersion));
    };
    LocalStorageService.prototype.restoreRawData = function (key, withVersion) {
        key = this.createKey(key, withVersion);
        return this.localStorage.getItem(key);
    };
    LocalStorageService.prototype.remove = function (key, withVersion) {
        key = this.createKey(key, withVersion);
        this.localStorage.removeItem(key);
    };
    LocalStorageService.prototype.clear = function (matchKey, withVersion) {
        matchKey = this.createKey(matchKey == null ? '' : matchKey, withVersion);
        this.removeMatched(matchKey);
    };
    LocalStorageService.prototype.clearByVersion = function (version) {
        this.removeMatched(this.prefix + version + '-');
    };
    LocalStorageService.prototype.keyPrefix = function (withVersion) {
        return withVersion === true ? this.prefix + this.version + '-' : this.prefix;
    };
    LocalStorageService.prototype.createKey = function (key, withVersion) {
        return this.keyPrefix(withVersion) + key;
    };
    LocalStorageService.prototype.removeMatched = function (matchKey) {
        var _this = this;
        if (matchKey == '') {
            this.localStorage.clear();
            return;
        }
        var keys = [];
        for (var i = 0; i < this.localStorage.length; i++) {
            keys.push(this.localStorage.key(i));
        }
        keys.forEach(function (key) {
            if (key.startsWith(matchKey)) {
                _this.localStorage.removeItem(key);
            }
        });
    };
    LocalStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LocalStorageService.ctorParameters = function () { return [
        { type: SerializeService },
        { type: Injector }
    ]; };
    return LocalStorageService;
}());
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map