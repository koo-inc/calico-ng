import { Component, forwardRef, Injector, Input, ViewChild } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { PopoverDirective } from "ng2-bootstrap";
import { FormItem } from "./item";

@Component({
  selector: 'c-integer',
  template: `
    <span class="text-container">
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
export class IntegerComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() placeholder: string = '数値';
  @Input() allowNegative: boolean = false;

  innerTextValue: string;
  textValueInvalid: boolean = false;
  textValueChanged: boolean = false;

  get textValue(): string {
    return this.innerTextValue;
  }
  set textValue(value: string) {
    if (value !== this.innerTextValue) {
      this.innerTextValue = value;
      this.textValueInvalid = !this.validFormat(value);
      this.textValueChanged = true;
      this.value = this.toVal(value);
      if(this.textValueInvalid){
        this.addError('integerFormat');
      }else{
        this.removeError('integerFormat')
      }
    }
  }
  formatTextValue(): void {
    if(!this.textValueChanged) return;
    if(this.value == null) return;
    this.innerTextValue = this.formatVal(this.value);
    this.textValueChanged = false;
  }

  writeValue(value: number): void {
    super.writeValue(value);

    this.innerTextValue = this.formatVal(value);
    this.textValueInvalid = false;
    this.textValueChanged = false;
  }

  private toVal(textValue: string): number {
    if(textValue == null || textValue.isBlank() || !this.validFormat(textValue)){
      return null;
    }
    return textValue.trim().hankaku().removeAll(',').toNumber();
  }

  private validFormat(textValue: string): boolean {
    if(this.allowNegative){
      return textValue == null || textValue.isBlank() || textValue.hankaku().trim().match(/^-?[0-9,]+$/) != null;
    }else{
      return textValue == null || textValue.isBlank() || textValue.hankaku().trim().match(/^[0-9,]+$/) != null;
    }
  }

  private formatVal(value: number): string {
    return value == null ? '' : value.format();
  }
}
