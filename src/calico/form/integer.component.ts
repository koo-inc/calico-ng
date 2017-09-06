import { Component, forwardRef, Injector, Input } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { FormattedTextFormItem } from "./item";

@Component({
  selector: 'c-integer',
  template: `
    <span class="text-input-container">
      <input type="text" [(ngModel)]="textValue"
        [class.invalid]="isInvalid()"
        [disabled]="readonly"
        [placeholder]="placeholder"
        (blur)="formatTextValue()"
      ><span class="text-input-icon fa fa-calculator"
      ></span><span class="invalid-text-format glyphicon glyphicon-warning-sign"
        [class.active]="textValueInvalid"
      ></span>
    </span>
    <c-error-tip [for]="control"></c-error-tip>
  `,
  styles: [`
    :host {
      display: inline-block;
      position: relative;
    }
    :host:not(:hover) c-error-tip {
      display: none !important;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntegerComponent),
      multi: true
    }
  ]
})
export class IntegerComponent extends FormattedTextFormItem<number> {
  constructor(injector: Injector) {
    super(injector);
    this.formatErrorMessage =  '正しい数値の形式ではありません。';
  }

  @Input() placeholder: string = '数値';
  @Input() allowNegative: boolean = false;
  @Input() separation = true;

  validFormat(textValue: string): boolean {
    if(textValue == null || textValue.isBlank()){
      return true;
    }
    if(this.allowNegative){
      return textValue.hankaku().trim().match(/^-?[0-9,]+$/) != null;
    }else{
      return textValue.hankaku().trim().match(/^[0-9,]+$/) != null;
    }
  }

  toVal(textValue: string): number {
    if(textValue == null || textValue.isBlank() || !this.validFormat(textValue)){
      return null;
    }
    return textValue.trim().hankaku().toNumber();
  }

  formatVal(value: number): string {
    return value == null ? '' : this.separation ? value.format() : value.toString();
  }
}
