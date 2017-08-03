import { Component, forwardRef, Injector } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormItem} from "./item";
import { Media } from "../type/media";

@Component({
  selector: 'c-file',
  template: `
    <span class="c-file" [class.invalid]="isInvalid()">
      <ng-container [ngSwitch]="state">
        <ng-container *ngSwitchCase="'loading'">
          <span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>
        </ng-container>
        <ng-container *ngSwitchCase="'input'">
          <span class="filename">{{value?.meta?.name}}</span>
          <button type="button" class="close" (click)="clearValue()" *ngIf="!readonly">&times;</button> 
        </ng-container>
        <ng-container *ngSwitchCase="'acceptable'">
          <input type="file"
            [disabled]="readonly"
            (change)="change($event.target)"
            (focus)="focus.next($event)"
            (blur)="blur.next($event)"
          /> 
        </ng-container>
      </ng-container>
      <c-error-tip [for]="control"></c-error-tip>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
      position: relative;
    }
    :host:not(:hover) c-error-tip {
      display: none !important;
    }
    .c-file {
      display: inline-flex;
      align-items: center;
    }
    .c-file.invalid {
      background-color: #fdd;
      border: solid 1px #f00;
    }
    .filename {
      padding-right: 5px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileComponent),
      multi: true
    }
  ]
})
export class FileComponent extends FormItem {
  private loading = false;

  constructor(injector: Injector) {
    super(injector);
  }

  get state(): 'loading' | 'input' | 'acceptable' {
    if (this.loading) {
      return 'loading';
    }
    if (this.value == null) {
      return 'acceptable';
    }
    return 'input';
  }

  private change(input: HTMLInputElement) {
    if (input.files == null || input.files.length == 0) {
      this.clearValue();
    }
    else {
      let file = input.files.item(0);
      this.loading = true;
      Media.read(file).then(media => {
        this.loading = false;
        this.value = media;
      }, e => {
        this.loading = false;
        this.value = null;
      });
    }
  }

  private clearValue() {
    this.value = null;
  }
}
