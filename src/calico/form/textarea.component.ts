import {Component, forwardRef, Injector} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormItem} from "./item";

@Component({
  selector: 'c-textarea',
  template: `
    <textarea [(ngModel)]="value"
      class="c-textarea"
      cols="30"
      rows="10"
      [disabled]="readonly"
      [class.invalid]="isInvalid()"
    ></textarea>
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
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }
}
