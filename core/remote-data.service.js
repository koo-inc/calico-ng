import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { Api } from "./api.service";
import { LocalStorageService } from "./local-storage.service";
export var REMOTE_DATA_TYPE = new InjectionToken('RemoteDataType');
var LOCAL_STORAGE_PREFIX = 'RemoteData.';
var RemoteDataService = /** @class */ (function () {
    function RemoteDataService(types, localStorageService, api, injector) {
        var _this = this;
        this.holderMap = {};
        if (types) {
            types.forEach(function (type) {
                RemoteDataService.normalizeType(type);
                _this.holderMap[type.key] = new RemoteDataHolder(type, localStorageService, api, injector);
            });
        }
    }
    RemoteDataService.normalizeType = function (type) {
        if (type.apiForm == null) {
            type.apiForm = function () { };
        }
        if (type.transform == null) {
            type.transform = function (rawData) { return rawData; };
        }
        if (type.expired == null) {
            type.expired = function () { return false; };
        }
        if (type.localStorageCahche == null) {
            type.localStorageCahche = true;
        }
        if (type.ensure == null) {
            type.ensure = true;
        }
    };
    RemoteDataService.prototype.getHolder = function (type) {
        return this.holderMap[type.key];
    };
    RemoteDataService.prototype.getType = function (key) {
        return this.holderMap[key].type;
    };
    RemoteDataService.prototype.get = function (type) {
        return this.getHolder(type).get();
    };
    RemoteDataService.prototype.getAsAsync = function (type) {
        return this.getHolder(type).getAsAsync();
    };
    RemoteDataService.prototype.discardCache = function (type) {
        this.getHolder(type).discardCache();
    };
    RemoteDataService.prototype.ensure = function () {
        var _this = this;
        return Promise.all(Object.keys(this.holderMap)
            .map(function (key) { return _this.holderMap[key]; })
            .filter(function (holder) { return holder.type.ensure; })
            .map(function (holder) { return holder.getAsAsync(); })).then(function () { return true; });
    };
    RemoteDataService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RemoteDataService.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [REMOTE_DATA_TYPE,] }] },
        { type: LocalStorageService },
        { type: Api },
        { type: Injector }
    ]; };
    return RemoteDataService;
}());
export { RemoteDataService };
var RemoteDataHolder = /** @class */ (function () {
    function RemoteDataHolder(type, localStorageService, api, injector) {
        this.type = type;
        this.localStorageService = localStorageService;
        this.api = api;
        this.injector = injector;
        this.localStorageKey = LOCAL_STORAGE_PREFIX + type.key;
    }
    RemoteDataHolder.prototype.get = function () {
        if (!this.type.ensure) {
            throw new Error('RemoteData.' + this.type.key + ' is not ensured type. use getAsAsync instead.');
        }
        if (this.data == null) {
            throw new Error('RemoteData.' + this.type.key + ' is null');
        }
        return this.data;
    };
    RemoteDataHolder.prototype.getAsAsync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // from memory
            if (_this.rawData && _this.data && !_this.type.expired(_this.rawData)) {
                resolve(_this.data);
                return;
            }
            // from localStorage
            if (_this.type.localStorageCahche) {
                var storedData = _this.localStorageService.restore(_this.localStorageKey, true);
                if (storedData && !_this.type.expired(storedData)) {
                    _this.rawData = storedData;
                    _this.data = _this.type.transform(storedData);
                    resolve(_this.data);
                    return;
                }
            }
            // submitting
            if (_this.submitting) {
                _this.submitting.then(function (data) {
                    resolve(data);
                });
                return;
            }
            // from api
            _this.submitting = _this.api.submit(_this.type.apiPath, _this.type.apiForm(_this.injector)).toPromise().then(function (data) {
                _this.rawData = data;
                _this.data = _this.type.transform(data);
                if (_this.type.localStorageCahche) {
                    _this.localStorageService.store(_this.localStorageKey, _this.rawData, true);
                }
                resolve(_this.data);
                _this.submitting = null;
                return _this.data;
            });
        });
    };
    RemoteDataHolder.prototype.discardCache = function () {
        this.rawData = null;
        this.data = null;
        if (this.type.localStorageCahche) {
            this.localStorageService.remove(this.localStorageKey, true);
        }
    };
    return RemoteDataHolder;
}());
var EnsureRemoteData = /** @class */ (function () {
    function EnsureRemoteData(remoteDataService) {
        this.remoteDataService = remoteDataService;
    }
    EnsureRemoteData.prototype.canActivateChild = function (route, state) {
        return this.remoteDataService.ensure();
    };
    EnsureRemoteData.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EnsureRemoteData.ctorParameters = function () { return [
        { type: RemoteDataService }
    ]; };
    return EnsureRemoteData;
}());
export { EnsureRemoteData };
//# sourceMappingURL=remote-data.service.js.map