import { Component, Injector, Input } from "@angular/core";
import { ControlContainer, FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'c-error-tip-container,[cErrorTipContainer]',
  template: `
    <ng-content></ng-content>
    <c-error-tip [for]="target"></c-error-tip>
  `,
  styles: [`
    :host(c-form-container) {
      display: block;
    }
    :host {
      position: relative;
    }
    :host:not(:hover) c-error-tip {
      display: none !important;
    }
  `],
  exportAs: 'cErrorTipContainer',
})
export class ErrorTipContainerComponent {
  @Input('for')
  private control: FormGroup | FormArray | FormControl;

  @Input('cErrorTipContainer')
  private attrControl: FormGroup | FormArray | FormControl;

  constructor() {
  }

  get target() {
    return this.control || this.attrControl;
  }
}
