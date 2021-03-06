import { Component, forwardRef, Injector, Input, ViewChild } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { FormItem } from "./item";

import { PopoverDirective } from "../ui/popover.directive";

@Component({
  selector: 'c-datepicker',
  template: `
    <span class="text-input-container">
      <input type="text" [(ngModel)]="textValue"
        [class.invalid]="isInvalid()"
        [disabled]="readonly"
        [placeholder]="placeholder"
        #popover="cPopover"
        [cPopover]="popoverTpl"
        (focus)="onFocus($event); focus.next($event)"
        (blur)="onBlur($event); blur.next($event)"
        (click)="onClick($event)"
      ><span class="text-input-icon fa fa-calendar"
      ></span><span class="invalid-text-format glyphicon glyphicon-warning-sign"
        [class.active]="isInvalidText()"
      ></span>
    </span>
    <ng-template #popoverTpl>
      <div class="c-datepicker-popover" (mousedown)="keep($event)">
        <datepicker [(ngModel)]="datepickerValue"
          [showWeeks]="false"
          [activeDate]="null"
          [startingDay]="1"
          formatDayTitle="YYYY年MM月"
          formatMonth="MM月"
          formatMonthTitle="YYYY年"
          formatYear="YYYY年"
          [minDate]="minDate"
          [maxDate]="maxDate"
        ></datepicker>
      </div>
    </ng-template>
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
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() defaultDate: Date = new Date();
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() placeholder: string = '日付';
  @Input() strictType: boolean = false;

  innerTextValue: string;
  textChanged: boolean = false;

  get textValue(): string {
    return this.innerTextValue;
  }
  set textValue(value: string) {
    if (value !== this.innerTextValue) {
      this.textChanged = true;
      this.popover.close();
      this.innerTextValue = value;
      let d: Date = this.toDate(this.innerTextValue);
      this.innerDatepickerValue = d;
      this.value = d != null ? this.strictType ? d : d.toISOString() : null;
      this.popover.close();
    }
  }
  isInvalidText(): boolean {
    return this.innerTextValue != null && this.innerTextValue != '' && this.datepickerValue == null;
  }
  adjustTextValue(): void {
    if(!this.textChanged) return;
    if(this.datepickerValue != null){
      this.innerTextValue = this.formatDate(this.datepickerValue);
    }
    this.textChanged = false;
  }

  innerDatepickerValue: Date;

  get datepickerValue(): Date {
    return this.innerDatepickerValue;
  }
  set datepickerValue(value: Date) {
    if (!Object.isEqual(value, this.innerDatepickerValue)) {
      this.innerDatepickerValue = value;
      this.innerTextValue = this.formatDate(value);
      this.textChanged = false;
      this.value = value != null ? this.strictType ? value : value.toISOString() : null;
    }
  }

  writeValue(value: any): void {
    super.writeValue(value);

    if(value == null || value == ''){
      this.innerTextValue = null;
    }else if(Object.isDate(value)){
      this.innerTextValue = this.formatDate(value);
    }else if(!Object.isDate(value)){
      this.innerTextValue = this.formatDate(this.toDate(value));
    }
    this.textChanged = false;

    if(value == null || value == ''){
      this.innerDatepickerValue = null;
    }else if(Object.isDate(value)){
      this.innerDatepickerValue = value;
    }else if(!Object.isDate(value)){
      this.innerDatepickerValue = this.toDate(value);
    }
  }

  private toDate(value: any): Date {
    let d: any = Date.create(value);
    return d.isValid() ? d : null;
  }

  private formatDate(value: Date): string {
    if(value == null){
      return null;
    }
    return value.format('{yyyy}/{MM}/{dd}');
  }

  @ViewChild('popover') popover: PopoverDirective;

  keepFlag = false;

  keep(): void {
    this.keepFlag = true;
  }

  onClick($event: any): void {
    this.popover.open();
  }

  onFocus($event: any): void {
    this.popover.open();
  }

  onBlur($event: any): void {
    if(this.keepFlag){
      $event.target.focus();
      this.keepFlag = false;
    }else{
      this.popover.close();
    }
    this.adjustTextValue();
  }
}
