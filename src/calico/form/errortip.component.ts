import {
  Component, Input, ElementRef, AfterContentChecked, Renderer2, Inject
} from '@angular/core';
import {
  NgControl, FormControlName, FormArrayName, FormGroupName, FormGroupDirective,
  ControlContainer
} from "@angular/forms";
import { MESSAGE_CONFIG, MessageConfig } from "../core";

@Component({
  selector: 'c-error-tip',
  template: `
    <div *ngIf="excited()">
      <div *ngFor="let key of getKeys()">{{messages[key] || key}}</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      bottom: calc(100% + 12px);
      position: absolute;
      padding: .5em 1em .4em;
      background-color: #f66;
      border: 1px solid #f00;
      border-radius: 5px;
      color: #fff;
      z-index: 10;
      white-space: nowrap;
    }
    :host:after, :host:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 15px;
      border: solid transparent;
    }
    :host:after {
      margin-left: 1px;
      border-top-color: #f66;
      border-width: 7px;
    }
    :host:before {
      border-top-color: #f00;
      border-width: 8px;
    }
  `]
})
export class ErrorTipComponent implements AfterContentChecked {
  @Input('for') target: NgControl | ControlContainer;

  constructor(@Inject(MESSAGE_CONFIG) private messages: MessageConfig, private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterContentChecked(): void {
    this.renderer.setStyle(this.el.nativeElement, "display", this.display());
  }

  display(): string {
    if (!this.excited()) return "none";
    return "block";
  }
  excited(): boolean {
    return this.target && this.target.errors
      && (this.isSubmittedControl() || this.isSubmittedArray() || this.isSubmittedGroup());
  }

  getKeys(): string[] {
    if (this.target == null) return [];
    return Object.keys(this.target.errors) as string[];
  }

  private isSubmittedControl(): boolean {
    return this.target && (this.target instanceof FormControlName) && this.target.formDirective.submitted;
  }

  private isSubmittedArray(): boolean {
    return this.target && (this.target instanceof FormArrayName) && this.target.formDirective.submitted;
  }

  private isSubmittedGroup(): boolean {
    return this.target && (this.target instanceof FormGroupName)
      && (this.target.formDirective instanceof FormGroupDirective) && this.target.formDirective.submitted;
  }
}
