import { Component, forwardRef, Injector, Input } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { FormattedTextFormItem } from "./item";

@Component({
  selector: 'c-currency',
  template: `
    <span class="text-input-container">
      <input type="text" [(ngModel)]="textValue"
        [class.invalid]="isInvalid()"
        [disabled]="readonly"
        [placeholder]="placeholder"
        (blur)="formatTextValue(); blur.next($event)"
        (focus)="focus.next($event)"
      ><span class="text-input-icon fa fa-jpy"
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
      useExisting: forwardRef(() => CurrencyComponent),
      multi: true
    }
  ]
})
export class CurrencyComponent extends FormattedTextFormItem<number> {
  constructor(injector: Injector) {
    super(injector);
    this.formatErrorMessage =  '正しい金額の形式ではありません。';
  }

  @Input() placeholder: string = '金額';
  @Input() allowNegative: boolean = false;

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
    return textValue.trim().hankaku().removeAll(',').toNumber();
  }

  formatVal(value: number): string {
    return value == null ? '' : value.format();
  }
}
