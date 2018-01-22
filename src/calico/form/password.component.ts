import { Component, forwardRef, Injector, Input } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormItem} from "./item";

@Component({
  selector: 'c-password',
  template: `
    <input type="password" class="c-password" [(ngModel)]="value"
      [class.invalid]="isInvalid()"
      [disabled]="readonly"
      [placeholder]="placeholder"
      [autocomplete]="autocomplete"
      (focus)="focus.next($event)"
      (blur)="blur.next($event)"
    />
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
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent extends FormItem {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'on';
}
