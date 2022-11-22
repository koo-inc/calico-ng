var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Observable } from "rxjs";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";
import { isPrimitive } from "../util/object";
var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent(injector, extEnumService, remoteDataService) {
        var _this = _super.call(this, injector) || this;
        _this.extEnumService = extEnumService;
        _this.remoteDataService = remoteDataService;
        _this.options = null;
        _this.optionKey = 'id';
        _this.optionLabel = 'name';
        _this.optionValue = null;
        _this.nullOption = true;
        _this.nullOptionLabel = '----';
        return _this;
    }
    SelectComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.initOptions();
    };
    SelectComponent.prototype.writeValue = function (value) {
        _super.prototype.writeValue.call(this, value);
        this._innerSelectValue = this.getOptionKey(value);
    };
    Object.defineProperty(SelectComponent.prototype, "selectValue", {
        get: function () {
            return this._innerSelectValue;
        },
        set: function (key) {
            if (key !== this._innerSelectValue) {
                this._innerSelectValue = key;
                var option = this._innerOptions.find(function (e) { return e.key == key; });
                this.value = option != null ? option.value : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.trackBy = function (idx, option) {
        return option.key;
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (Object.has(changes, 'options')
            || Object.has(changes, 'extEnum')
            || Object.has(changes, 'optionLabel')
            || Object.has(changes, 'nullOption')
            || Object.has(changes, 'nullOptionLabel')) {
            this.initOptions();
        }
    };
    SelectComponent.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    SelectComponent.prototype.initOptions = function () {
        var _this = this;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this._innerOptions = [];
        if (this.nullOption) {
            this._innerOptions.push({ key: null, label: this.nullOptionLabel, value: null });
        }
        if (this.options != null) {
            if (this.options['length'] === 0) {
                return;
            }
            if (this.options instanceof Observable) {
                this.subscription = this.options.subscribe(this.setupOptions.bind(this));
            }
            else {
                this.setupOptions(this.options);
            }
        }
        else if (this.remoteData != null) {
            var remoteDataType = this.remoteDataService.getType(this.remoteData);
            if (remoteDataType.ensure) {
                this.setupOptions(this.remoteDataService.get(remoteDataType));
            }
            else {
                this.remoteDataService.getAsAsync(remoteDataType).then(function (data) {
                    _this.setupOptions(data);
                });
            }
        }
        else if (this.extEnum != null) {
            this.setupOptions(this.extEnumService.getValues(this.extEnum));
        }
    };
    SelectComponent.prototype.setupOptions = function (options) {
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            var key = this.getOptionKey(option);
            var label = this.getOptionLabel(option);
            var value = this.getOptionValue(option);
            this._innerOptions.push({ key: key, label: label, value: value });
        }
        this._innerSelectValue = this.getOptionKey(this.value);
    };
    SelectComponent.prototype.getOptionKey = function (option) {
        if (this.optionKey == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionKey];
    };
    SelectComponent.prototype.getOptionLabel = function (option) {
        if (this.optionLabel == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionLabel];
    };
    SelectComponent.prototype.getOptionValue = function (option) {
        if (this.optionValue == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionValue];
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-select',
                    template: "\n    <select class=\"c-select\" [(ngModel)]=\"selectValue\"\n            [class.invalid]=\"isInvalid()\"\n            [disabled]=\"readonly\"\n            (focus)=\"focus.next($event)\"\n            (blur)=\"blur.next($event)\"\n    >\n      <option *ngFor=\"let e of _innerOptions;trackBy:trackBy\" [ngValue]=\"e.key\">{{e.label}}</option>\n    </select>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return SelectComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: Injector },
        { type: ExtEnumService },
        { type: RemoteDataService }
    ]; };
    SelectComponent.propDecorators = {
        options: [{ type: Input }],
        remoteData: [{ type: Input }],
        extEnum: [{ type: Input }],
        optionKey: [{ type: Input }],
        optionLabel: [{ type: Input }],
        optionValue: [{ type: Input }],
        nullOption: [{ type: Input }],
        nullOptionLabel: [{ type: Input }]
    };
    return SelectComponent;
}(FormItem));
export { SelectComponent };
//# sourceMappingURL=select.component.js.map