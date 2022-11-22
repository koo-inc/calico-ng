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
var CheckboxesComponent = /** @class */ (function (_super) {
    __extends(CheckboxesComponent, _super);
    function CheckboxesComponent(injector, extEnumService, remoteDataService) {
        var _this = _super.call(this, injector) || this;
        _this.extEnumService = extEnumService;
        _this.remoteDataService = remoteDataService;
        _this.options = null;
        _this.optionKey = 'id';
        _this.optionLabel = 'name';
        _this.optionValue = null;
        return _this;
    }
    CheckboxesComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.initOptions();
    };
    CheckboxesComponent.prototype.writeValue = function (value) {
        _super.prototype.writeValue.call(this, value);
        this.setSelected(value);
    };
    CheckboxesComponent.prototype.click = function (option) {
        option.selected = !option.selected;
        this.value = this.getValues();
    };
    CheckboxesComponent.prototype.ngOnChanges = function (changes) {
        if (Object.has(changes, 'options')
            || Object.has(changes, 'extEnum')
            || Object.has(changes, 'optionLabel')) {
            this.initOptions();
        }
    };
    CheckboxesComponent.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    CheckboxesComponent.prototype.initOptions = function () {
        var _this = this;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this._innerOptions = [];
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
    CheckboxesComponent.prototype.setupOptions = function (options) {
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            var key = this.getOptionKey(option);
            var label = this.getOptionLabel(option);
            var value = this.getOptionValue(option);
            this._innerOptions.push({ key: key, label: label, value: value, selected: false });
        }
        this.setSelected(this.value);
    };
    CheckboxesComponent.prototype.getOptionKey = function (option) {
        if (this.optionKey == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionKey];
    };
    CheckboxesComponent.prototype.getOptionLabel = function (option) {
        if (this.optionLabel == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionLabel];
    };
    CheckboxesComponent.prototype.getOptionValue = function (option) {
        if (this.optionValue == null || isPrimitive(option)) {
            return option;
        }
        return option[this.optionValue];
    };
    CheckboxesComponent.prototype.getValues = function () {
        return this._innerOptions
            .filter(function (e) { return e.selected; })
            .map(function (e) { return e.value; });
    };
    CheckboxesComponent.prototype.setSelected = function (value) {
        var _this = this;
        if (value == null || !Object.isArray(value) || value.length == 0) {
            return;
        }
        value
            .map(function (e) { return _this.getOptionKey(e); })
            .map(function (key) { return _this._innerOptions.find(function (e) { return e.key == key; }); })
            .filter(function (option) { return option != null; })
            .forEach(function (option) { option.selected = true; });
    };
    CheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'c-checkboxes',
                    template: "\n    <span class=\"btn-group c-checkboxes\" [class.invalid]=\"isInvalid()\">\n      <button *ngFor=\"let e of _innerOptions\" \n        type=\"button\" class=\"btn btn-default c-checkbox\"\n        [disabled]=\"readonly\"\n        (click)=\"click(e)\"\n      ><span *ngIf=\"e.selected\" class=\"fa fa-check-square fa-fw\"></span><span *ngIf=\"!e.selected\" class=\"fa fa-square-o fa-fw\"></span>{{e.label}}</button>\n    </span>\n    <c-error-tip [for]=\"control\"></c-error-tip>\n  ",
                    styles: ["\n    :host {\n      display: inline-block;\n      position: relative;\n    }\n    :host:not(:hover) c-error-tip {\n      display: none !important;\n    }\n  "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CheckboxesComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    CheckboxesComponent.ctorParameters = function () { return [
        { type: Injector },
        { type: ExtEnumService },
        { type: RemoteDataService }
    ]; };
    CheckboxesComponent.propDecorators = {
        options: [{ type: Input }],
        remoteData: [{ type: Input }],
        extEnum: [{ type: Input }],
        optionKey: [{ type: Input }],
        optionLabel: [{ type: Input }],
        optionValue: [{ type: Input }]
    };
    return CheckboxesComponent;
}(FormItem));
export { CheckboxesComponent };
//# sourceMappingURL=checkboxes.component.js.map