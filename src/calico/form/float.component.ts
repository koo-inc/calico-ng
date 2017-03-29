import { Component, forwardRef, Injector, Input } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { FormattedTextFormItem } from "./item";

@Component({
  selector: 'c-float',
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
      useExisting: forwardRef(() => FloatComponent),
      multi: true
    }
  ]
})
export class FloatComponent extends FormattedTextFormItem<number> {
  constructor(injector: Injector) {
    super(injector);
    this.formatErrorMessage =  '正しい数値の形式ではありません。';
  }

  @Input() placeholder: string;
  @Input() step: number = 0.1;
  @Input() allowNegative: boolean = false;

  ngOnInit(): void {
    super.ngOnInit();
    if(this.placeholder == null){
      this.placeholder = '数値({0}単位)'.format(this.step);
    }
    if(this.step != null){
      if(this.step.toString().match(/\.[0-9]{3,}$/)){
        throw new Error('stepは少数2桁までしか指定できません。');
      }
    }
  }

  validFormat(textValue: string): boolean {
    if(textValue == null || textValue.isBlank()){
      return true;
    }
    let regexCheck;
    if(this.allowNegative){
      regexCheck = textValue.hankaku().trim().match(/^-?[0-9,]+(\.[0-9]{1,2})?$/) != null;
    }else{
      regexCheck = textValue.hankaku().trim().match(/^[0-9,]+(\.[0-9]{1,2})?$/) != null;
    }
    if(!regexCheck) return false;

    let val = textValue.trim().hankaku().removeAll(',').toNumber();
    return (val * 1000) % (this.step * 1000) == 0;
  }

  toVal(textValue: string): number {
    if(textValue == null || textValue.isBlank() || !this.validFormat(textValue)){
      return null;
    }
    return textValue.trim().hankaku().removeAll(',').toNumber();
  }

  formatVal(value: number): string {
    return value == null ? '' : value.format();
  }
}
