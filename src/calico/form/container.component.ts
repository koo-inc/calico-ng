import { Component, DoCheck, Injector } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
  selector: 'c-form-container,[cFormContainer]',
  template: `
    <ng-content></ng-content>
    <c-error-tip [for]="controlContainer"></c-error-tip>
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
  exportAs: 'cFormContainer',
})
export class FormContainerComponent {
  controlContainer: ControlContainer;

  constructor(private injector: Injector) {
    this.controlContainer = this.injector.get(ControlContainer);
  }
}
