import { Component, Input } from "@angular/core";

import { SearchContext } from "./search.service";

@Component({
  selector: '[cSort]',
  template: `
    <div class="c-sort"
      (click)="onClick()">
      <ng-content></ng-content>
      <span *ngIf="isAsc()" class="active" class="fa fa-sort-asc"></span>
      <span *ngIf="isDesc()" class="active" class="fa fa-sort-desc"></span>
      <span *ngIf="!isAsc() && !isDesc()" class="fa fa-sort"></span>
    </div>
  `
})
export class SortComponent {
  @Input('cSort') prop: string;

  constructor(
    private searchContext: SearchContext,
  ) {}

  onClick(): void {
    this.searchContext.onSortChange(this.prop);
  }

  isAsc(): boolean {
    if(this.searchContext.form.value._sort == null) return false;
    return this.searchContext.form.value._sort.prop == this.prop && this.searchContext.form.value._sort.type == 'ASC'
  }

  isDesc(): boolean {
    if(this.searchContext.form.value._sort == null) return false;
    return this.searchContext.form.value._sort.prop == this.prop && this.searchContext.form.value._sort.type == 'DESC'
  }
}

