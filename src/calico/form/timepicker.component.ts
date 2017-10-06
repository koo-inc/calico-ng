import { Component, forwardRef, Injector, Input, ViewChild } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { PopoverDirective } from "../ui/popover.directive";
import { FormItem } from "./item";

@Component({
  selector: 'c-timepicker',
  template: `
    <span class="text-input-container">
      <input type="text" [(ngModel)]="textValue"
        [class.invalid]="isInvalid()"
        [disabled]="readonly"
        [placeholder]="placeholder"
        #popover="cPopover"
        [cPopover]="popoverTpl"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="onClick($event)"
      ><span class="text-input-icon fa fa-clock-o"
      ></span><span class="invalid-text-format glyphicon glyphicon-warning-sign"
        [class.active]="isInvalidText()"
      ></span>
    </span>
    <ng-template #popoverTpl>
      <div class="c-timepicker-popover" (mousedown)="keep($event)">
        <timepicker [(ngModel)]="timepickerValue"
          [arrowkeys]="true"
          [mousewheel]="false"
          [showSpinners]="true"
          [showMeridian]="false"
          [hourStep]="stepHour"
          [minuteStep]="stepMinute"
        ></timepicker>
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
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true
    }
  ]
})
export class TimepickerComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() defaultDate: Date = this.toDate('00:00');
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 5;
  @Input() placeholder: string = '時間';

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
      this.innerTimepickerValue = d;
      this.value = d != null ? d.toISOString() : null;
      this.popover.open();
    }
  }
  isInvalidText(): boolean {
    return this.innerTextValue != null && this.innerTextValue != '' && this.timepickerValue === this.defaultDate;
  }
  adjustTextValue(): void {
    if(!this.textChanged) return;
    if(this.timepickerValue !== this.defaultDate){
      this.innerTextValue = this.formatDate(this.timepickerValue);
    }
    this.textChanged = false;
  }

  innerTimepickerValue: Date;

  get timepickerValue(): Date {
    return this.innerTimepickerValue || this.defaultDate;
  }
  set timepickerValue(value: Date) {
    value = this.toDate(value);
    if (!Object.isEqual(value, this.innerTimepickerValue) && value !== this.defaultDate) {
      this.innerTimepickerValue = value;
      this.innerTextValue = this.formatDate(value);
      this.textChanged = false;
      this.value = value != null ? value.toISOString() : null;
    }
  }

  writeValue(value: any): void {
    let date = this.toDate(value);
    super.writeValue(date);

    this.innerTextValue = this.formatDate(date);
    this.textChanged = false;

    this.innerTimepickerValue = date;
  }

  private toDate(value: any): Date {
    if (value == null || value == '') return null;
    if (typeof value === 'string' && (value.length < 5 || value.indexOf(':') < 0)) return null;
    let d = value instanceof Date ? value : Date.create(value);
    if (isNaN(d.getTime())) return null;
    let offset = d.getTimezoneOffset();
    let mills = ((Math.floor(d.getTime() / (1).minute()) - offset) % (24 * 60) + offset) * (1).minutes();
    if (d.getTime() === mills) return d;
    return Date.create(mills);
  }

  private formatDate(value: Date): string {
    if(value == null){
      return null;
    }
    return value.format('{HH}:{mm}');
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
