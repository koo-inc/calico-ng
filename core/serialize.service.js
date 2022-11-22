import { Injectable } from '@angular/core';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
var SerializeService = /** @class */ (function () {
    function SerializeService() {
    }
    SerializeService.prototype.serialize = function (obj) {
        return compressToEncodedURIComponent(JSON.stringify(obj));
    };
    SerializeService.prototype.deserialize = function (str) {
        try {
            return JSON.parse(decompressFromEncodedURIComponent(str || ''));
        }
        catch (e) {
            return null;
        }
    };
    SerializeService.decorators = [
        { type: Injectable },
    ];
    return SerializeService;
}());
export { SerializeService };
//# sourceMappingURL=serialize.service.js.map