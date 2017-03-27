import { Component, forwardRef, Injector } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormItem} from "./item";

@Component({
  selector: 'c-textfield',
  template: `
    <input type="text" [(ngModel)]="value"
      class="c-textfield"
      [disabled]="readonly"
      (focus)="focus.next($event)"
      (blur)="blur.next($event)"
      [class.invalid]="isInvalid()"/>
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
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }
}
