import { Pipe } from "@angular/core";
import { ExtEnumService } from "./ext-enum.service";
var ExtEnumPipe = /** @class */ (function () {
    function ExtEnumPipe(extEnumService) {
        this.extEnumService = extEnumService;
    }
    ExtEnumPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var enumName = args[0];
        var propName = args[1] || 'name';
        if (enumName == null)
            return null;
        var extEnum = this.extEnumService.getValue(enumName, value);
        return extEnum ? extEnum[propName] : null;
    };
    ExtEnumPipe.decorators = [
        { type: Pipe, args: [{ name: 'extEnum' },] },
    ];
    /** @nocollapse */
    ExtEnumPipe.ctorParameters = function () { return [
        { type: ExtEnumService }
    ]; };
    return ExtEnumPipe;
}());
export { ExtEnumPipe };
//# sourceMappingURL=ext-enum.pipe.js.map