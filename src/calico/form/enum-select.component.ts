import { Component, forwardRef, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { FormItem } from "./item";
import { ExtEnum, ExtEnumService } from "../core/ext-enum.service";

declare type OptionValue = {
  id: any;
  name: string;
  value: ExtEnum;
}

@Component({
  selector: 'c-enum-select',
  template: `
    <select class="c-select enum-select"
            [(ngModel)]="option"
            [class.invalid]="isInvalid()"
            [disabled]="readonly">
      <option *ngFor="let option of options" [ngValue]="option">{{option.name}}</option>
    </select>
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
      useExisting: forwardRef(() => EnumSelectComponent),
      multi: true
    }
  ]
})
export class EnumSelectComponent extends FormItem implements OnInit, OnChanges {
  constructor(injector: Injector, private enumService: ExtEnumService) {
    super(injector);
  }

  @Input()
  private enumName: string;

  private nullValue: OptionValue = {id: null, name: '---', value: null};
  private options: OptionValue[] = [this.nullValue];

  private _option: OptionValue;
  private set option(option: OptionValue) {
    this._option = option || this.nullValue;
    if (option != null) {
      this.value = this._option.value;
    }
  }
  private get option() { return this._option }


  ngOnInit(): void {
    super.ngOnInit();
    this.initOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.has(changes, 'enumName')) {
      this.initOptions();
    }
  }

  writeValue(value: any) {
    super.writeValue(value);
    this._option = this.findOption(value);
  }

  private initOptions() {
    let options$ = this.enumName != null ? this.enumService.values(this.enumName).map(data => data[this.enumName]) : Observable.of([]);

    options$
      .map(options => options.map((v: OptionValue) => ({id: v.id, name: v.name, value: v})) as OptionValue[])
      .map(options => [this.nullValue].append(options))
      .subscribe(options => {
        this.options = options;
        this.option = this.findOption(this.value);
      });
  }

  private findOption(value: any): OptionValue {
    let id = value != null && value.id != null ? value.id : value;
    if (this.options.length == 1) return null;
    let option = this.options.find((v: OptionValue) => v.id == id);
    return option != null ? option : this.nullValue;
  }
}
