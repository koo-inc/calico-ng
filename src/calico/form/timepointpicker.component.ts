import { Component, forwardRef, Injector, Input, ViewChild } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { PopoverDirective } from '../ui/popover.directive';
import { FormItem } from "./item";
import { TimePoint } from "../type/time";

const str = (v: any) => v != null ? v.toString() : null;
const lpad = (n: number) => n != null ? str(n).padLeft(2, '0') : null;
const parse = (s: string) => {
  if (s == null) return [];
  let group = /^([0-9]{1,2})[^0-9]*?([0-9]{1,2})$/.exec(s);
  if (group == null) return [];
  return [parseInt(group[1]), parseInt(group[2])].map(v => Number.isNaN(v) ? null : Math.floor(v))
};

@Component({
  selector: 'c-timepointpicker',
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
             (keydown)="onKeydown($event)"
      ><span class="text-input-icon fa fa-clock-o"
    ></span><span class="invalid-text-format glyphicon glyphicon-warning-sign"
                  [class.active]="isInvalidText()"
    ></span>
    </span>
    <ng-template #popoverTpl>
      <div class="c-timepointpicker-popover" (mousedown)="keep($event)">
        <div class="hours">
          <a cGlyphicon="menu-up" (click)="addHours(stepHour)"></a>
          <div class="value">{{hoursText}}</div>
          <a cGlyphicon="menu-down" (click)="addHours(-stepHour)"></a>
        </div>
        <div class="separator">:</div>
        <div class="minutes">
          <a cGlyphicon="menu-up" (click)="addMinutes(stepMinute)"></a>
          <div class="value">{{minutesText}}</div>
          <a cGlyphicon="menu-down" (click)="addMinutes(-stepMinute)"></a>
        </div>
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
      useExisting: forwardRef(() => TimePointPickerComponent),
      multi: true
    }
  ]
})
export class TimePointPickerComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() defaultTimePoint: TimePoint = TimePoint.create(0);
  @Input() min: TimePoint;
  @Input() max: TimePoint;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 5;
  @Input() placeholder: string = '時刻';

  innerHours: number;
  innerMinutes: number;

  addHours(hours: number) {
    if (this.innerMinutes == null || this.innerHours == null) {
      this.innerHours = 0;
      this.innerMinutes = 0;
    }
    this.innerHours += hours;
    this.justifyInnerValues();
    this.writeBackToTextValue();
    this.value = TimePoint.create(this.textValue);
  }
  addMinutes(minutes: number) {
    if (this.innerMinutes == null || this.innerHours == null) {
      this.innerHours = 0;
      this.innerMinutes = 0;
    }
    this.innerMinutes += minutes;
    this.justifyInnerValues();
    this.writeBackToTextValue();
    this.value = TimePoint.create(this.textValue);
  }

  private justifyInnerValues() {
    if (this.innerHours == null || this.innerMinutes == null) {
      this.innerHours = 0;
      this.innerMinutes = 0;
    }
    let timeParts = this.justifyTimeParts(this.innerHours, this.innerMinutes);
    this.innerHours = timeParts[0];
    this.innerMinutes = timeParts[1];
  }

  private justifyTimeParts(h: number, m: number) {
    if (h == null || m == null) {
      return [null, null];
    }

    let max = this.max != null ? this.max.getMinutesAmount() : 99 * 60 + 59;
    max = max - (max % this.stepMinute);
    let min = this.min != null ? this.min.getMinutesAmount() : 0;
    min = min % this.stepMinute == 0 ? min : min + (this.stepMinute - (min % this.stepMinute));
    if (max < 0 || min < 0 || min > max) {
      return [null, null];
    }

    let minutes = h * 60 + m;
    while(minutes < 0) {
      minutes = max + minutes;
    }
    minutes = minutes - (minutes % this.stepMinute);
    minutes = Math.min(Math.max(minutes, min), max);

    return [Math.floor(minutes / 60), Math.floor(minutes % 60)];
  }

  private writeBackToTextValue() {
    if (this.innerHours == null || this.innerMinutes == null) {
      this.innerTextValue = '';
    }
    else {
      this.innerTextValue = this.hoursText + ':' + this.minutesText;
    }
  }

  get hoursText() {
    return lpad(this.innerHours);
  }
  get minutesText() {
    return lpad(this.innerMinutes);
  }

  innerTextValue: string;
  textChanged: boolean = false;

  get textValue(): string {
    return this.innerTextValue;
  }
  set textValue(value: string) {
    if (value !== this.innerTextValue) {
      this.textChanged = true;
      this.innerTextValue = value;
      this.popover.close();
      let timeparts = parse(value);
      timeparts = this.justifyTimeParts(timeparts[0], timeparts[1]);
      if (this.innerHours != timeparts[0] || this.innerMinutes != timeparts[1]) {
        this.innerHours = timeparts[0];
        this.innerMinutes = timeparts[1];
        this.value = TimePoint.create(this.innerHours, this.innerMinutes);
        this.popover.open();
      }
    }
  }
  isInvalidText(): boolean {
    return this.innerTextValue != null && this.innerTextValue != '' && this.value === this.defaultTimePoint;
  }
  adjustTextValue(): void {
    if(!this.textChanged) return;
    if(this.value !== this.defaultTimePoint){
      this.innerTextValue = str(this.value);
    }
    this.textChanged = false;
  }

  writeValue(value: any): void {
    let tp = TimePoint.create(value);
    if (tp != null) {
      this.innerHours = tp.hours;
      this.innerMinutes = tp.minutes;
    }
    super.writeValue(tp);

    this.innerTextValue = str(tp);
    this.textChanged = false;
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

  onKeydown($event: any): void {
    switch($event.code) {
      case 'ArrowUp': this.addMinutes(this.stepMinute); break;
      case 'ArrowDown': this.addMinutes(-this.stepMinute); break;
    }
  }
}
