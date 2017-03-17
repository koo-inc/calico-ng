import { Component, Input, ContentChild } from '@angular/core';

@Component({
  selector: 'c-panel-header',
  template: '<ng-content></ng-content>'
})
export class PanelHeaderComponent {}

@Component({
  selector: 'c-panel-footer',
  template: '<ng-content></ng-content>'
})
export class PanelFooterComponent {}

@Component({
  selector: 'c-panel',
  template: `
    <div class="panel panel-default">
      <div class="panel-heading" *ngIf="showHeader">
        {{title}}
        <ng-content select="c-panel-header"></ng-content>
      </div>
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
      <div class="panel-footer" *ngIf="showFooter">
        <ng-content select="c-panel-footer"></ng-content>
      </div>
    </div>
  `
})
export class PanelComponent {
  @Input() title: string;

  @ContentChild(PanelHeaderComponent) header: PanelHeaderComponent;
  @ContentChild(PanelFooterComponent) footer: PanelFooterComponent;

  get showHeader(): boolean {
    return this.header != null || this.title != null;
  }

  get showFooter(): boolean {
    return this.footer != null;
  }

}
