/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "./errortip.component.ngfactory";
import * as i3 from "./errortip.component";
import * as i4 from "../core/api.service";
import * as i5 from "./float.component";
var styles_FloatComponent = ["[_nghost-%COMP%] {\n      display: inline-block;\n      position: relative;\n    }\n    [_nghost-%COMP%]:not(:hover)   c-error-tip[_ngcontent-%COMP%] {\n      display: none !important;\n    }"];
var RenderType_FloatComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_FloatComponent, data: {} });
export { RenderType_FloatComponent as RenderType_FloatComponent };
export function View_FloatComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "span", [["class", "text-input-container"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 5, "input", [["type", "text"]], [[2, "invalid", null], [8, "placeholder", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "blur"], [null, "focus"], [null, "input"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 2)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 2).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 2)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 2)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.textValue = $event) !== false);
        ad = (pd_4 && ad);
    } if (("blur" === en)) {
        _co.formatTextValue();
        var pd_5 = (_co.blur.next($event) !== false);
        ad = (pd_5 && ad);
    } if (("focus" === en)) {
        var pd_6 = (_co.focus.next($event) !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), i0.ɵdid(2, 16384, null, 0, i1.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i1.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i1.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.DefaultValueAccessor]), i0.ɵdid(4, 671744, null, 0, i1.NgModel, [[8, null], [8, null], [8, null], [6, i1.NG_VALUE_ACCESSOR]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i1.NgControl, null, [i1.NgModel]), i0.ɵdid(6, 16384, null, 0, i1.NgControlStatus, [[4, i1.NgControl]], null, null), (_l()(), i0.ɵeld(7, 0, null, null, 0, "span", [["class", "text-input-icon fa fa-calculator"]], null, null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 0, "span", [["class", "invalid-text-format glyphicon glyphicon-warning-sign"]], [[2, "active", null]], null, null, null, null)), (_l()(), i0.ɵeld(9, 0, null, null, 1, "c-error-tip", [], null, null, null, i2.View_ErrorTipComponent_0, i2.RenderType_ErrorTipComponent)), i0.ɵdid(10, 2146304, null, 0, i3.ErrorTipComponent, [i4.MESSAGE_CONFIG, i0.ElementRef, i0.Renderer2, i0.Injector], { target: [0, "target"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_9 = _co.readonly; var currVal_10 = _co.textValue; _ck(_v, 4, 0, currVal_9, currVal_10); var currVal_12 = _co.control; _ck(_v, 10, 0, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isInvalid(); var currVal_1 = _co.placeholder; var currVal_2 = i0.ɵnov(_v, 6).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 6).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 6).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 6).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 6).ngClassValid; var currVal_7 = i0.ɵnov(_v, 6).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 6).ngClassPending; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_11 = _co.textValueInvalid; _ck(_v, 8, 0, currVal_11); }); }
export function View_FloatComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "c-float", [], null, null, null, View_FloatComponent_0, RenderType_FloatComponent)), i0.ɵprd(5120, null, i1.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i5.FloatComponent]), i0.ɵdid(2, 638976, null, 0, i5.FloatComponent, [i0.Injector], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var FloatComponentNgFactory = i0.ɵccf("c-float", i5.FloatComponent, View_FloatComponent_Host_0, { readonly: "readonly", inputValue: "value", placeholder: "placeholder", step: "step", allowNegative: "allowNegative" }, { cChange: "cChange", focus: "focus", blur: "blur" }, []);
export { FloatComponentNgFactory as FloatComponentNgFactory };
//# sourceMappingURL=float.component.ngfactory.js.map