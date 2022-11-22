/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./errortip.component.ngfactory";
import * as i3 from "./errortip.component";
import * as i4 from "../core/api.service";
import * as i5 from "@angular/forms";
import * as i6 from "./checkbox.component";
var styles_CheckboxComponent = ["[_nghost-%COMP%] {\n      display: inline-block;\n      position: relative;\n    }\n    [_nghost-%COMP%]:not(:hover)   c-error-tip[_ngcontent-%COMP%] {\n      display: none !important;\n    }"];
var RenderType_CheckboxComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_CheckboxComponent, data: {} });
export { RenderType_CheckboxComponent as RenderType_CheckboxComponent };
function View_CheckboxComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "fa fa-check-square fa-fw"]], null, null, null, null, null))], null, null); }
function View_CheckboxComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "fa fa-square-o fa-fw"]], null, null, null, null, null))], null, null); }
export function View_CheckboxComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "button", [["class", "btn btn-default c-checkbox"], ["type", "button"]], [[2, "invalid", null], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_CheckboxComponent_1)), i0.ɵdid(2, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_CheckboxComponent_2)), i0.ɵdid(4, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(5, null, ["", ""])), (_l()(), i0.ɵeld(6, 0, null, null, 1, "c-error-tip", [], null, null, null, i2.View_ErrorTipComponent_0, i2.RenderType_ErrorTipComponent)), i0.ɵdid(7, 2146304, null, 0, i3.ErrorTipComponent, [i4.MESSAGE_CONFIG, i0.ElementRef, i0.Renderer2, i0.Injector], { target: [0, "target"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.checked; _ck(_v, 2, 0, currVal_2); var currVal_3 = !_co.checked; _ck(_v, 4, 0, currVal_3); var currVal_5 = _co.control; _ck(_v, 7, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isInvalid(); var currVal_1 = _co.readonly; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_4 = _co.label; _ck(_v, 5, 0, currVal_4); }); }
export function View_CheckboxComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "c-checkbox", [], null, null, null, View_CheckboxComponent_0, RenderType_CheckboxComponent)), i0.ɵprd(5120, null, i5.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i6.CheckboxComponent]), i0.ɵdid(2, 638976, null, 0, i6.CheckboxComponent, [i0.Injector], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var CheckboxComponentNgFactory = i0.ɵccf("c-checkbox", i6.CheckboxComponent, View_CheckboxComponent_Host_0, { readonly: "readonly", inputValue: "value", label: "label", trueValue: "trueValue", falseValue: "falseValue" }, { cChange: "cChange", focus: "focus", blur: "blur" }, []);
export { CheckboxComponentNgFactory as CheckboxComponentNgFactory };
//# sourceMappingURL=checkbox.component.ngfactory.js.map