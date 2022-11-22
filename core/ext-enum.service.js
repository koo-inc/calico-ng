import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
var ExtEnum = /** @class */ (function () {
    function ExtEnum() {
    }
    return ExtEnum;
}());
export { ExtEnum };
var ExtEnumData = /** @class */ (function () {
    function ExtEnumData() {
    }
    return ExtEnumData;
}());
export { ExtEnumData };
export var EXT_ENUM_DATA_PROVIDER = new InjectionToken('ExtEnumDataProvider');
var ExtEnumService = /** @class */ (function () {
    function ExtEnumService(provider) {
        this.provider = provider;
    }
    ExtEnumService.prototype.getAll = function () {
        if (this.provider == null) {
            throw new Error('ExtEnumDataProvider not defined');
        }
        return this.provider.getAll();
    };
    ExtEnumService.prototype.getValues = function (enumName) {
        var data = this.provider.getAll();
        if (data[enumName] == null) {
            throw new Error('unknown ExtEnum key ' + enumName);
        }
        return data[enumName];
    };
    ExtEnumService.prototype.getValue = function (enumName, id) {
        return this.getValues(enumName).find(function (e) { return e.id == id; }) || null;
    };
    ExtEnumService.prototype.getValuesMap = function () {
        var _this = this;
        var enumNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            enumNames[_i] = arguments[_i];
        }
        var map = {};
        enumNames.forEach(function (name) {
            map[name] = _this.getValues(name);
        });
        return map;
    };
    ExtEnumService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ExtEnumService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_ENUM_DATA_PROVIDER,] }] }
    ]; };
    return ExtEnumService;
}());
export { ExtEnumService };
//# sourceMappingURL=ext-enum.service.js.map