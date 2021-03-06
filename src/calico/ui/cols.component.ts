import { Component, Input } from '@angular/core';

@Component({
  selector: '[cCols]',
  template: `
    <col *ngFor="let col of cols" [width]="col">
    <ng-content></ng-content>
  `
})
export class ColsComponent {

  private _cols: any[] = [];

  @Input('cCols')
  set cols(value: any[]) {
    if(value == null || !Object.isArray(value) || value.length == 0){
      this._cols = [];
      return;
    }
    this._cols = value.map((e: any) => {
      if(e == null) return '';
      if(Object.isNumber(e)) return e + '%';
      return e.toString();
    });
  }
  get cols(): any[] {
    return this._cols;
  }

}
