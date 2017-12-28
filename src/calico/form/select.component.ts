import { Component, forwardRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";

@Component({
  selector: 'c-select',
  template: `
    <select class="c-select" [(ngModel)]="selectValue"
            [class.invalid]="isInvalid()"
            [disabled]="readonly"
            (focus)="focus.next($event)"
            (blur)="blur.next($event)"
    >
      <option *ngFor="let e of _innerOptions;trackBy:trackBy" [ngValue]="e.key">{{e.label}}</option>
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
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent extends FormItem implements OnChanges, OnDestroy {
  constructor(
    injector: Injector,
    private extEnumService: ExtEnumService,
    private remoteDataService: RemoteDataService,
  ) {
    super(injector);
  }

  @Input() options: any[] | Observable<any[]> = null;
  @Input() remoteData: string;
  @Input() extEnum: string;
  @Input() optionKey: string = 'id';
  @Input() optionLabel: string = 'name';
  @Input() optionValue: string = null;
  @Input() nullOption: boolean = true;
  @Input() nullOptionLabel: string = '----';

  _innerSelectValue: any;
  _innerOptions: SelectOption[];

  private subscription: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    this.initOptions();
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this._innerSelectValue = this.getOptionKey(value);
  }

  get selectValue(): any {
    return this._innerSelectValue;
  }
  set selectValue(key: any) {
    if (key !== this._innerSelectValue) {
      this._innerSelectValue = key;
      let option = this._innerOptions.find((e: SelectOption) => e.key == key);
      this.value = option != null ? option.value : null;
    }
  }

  trackBy(idx: any, option: any) {
    return option.key;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(Object.has(changes, 'options')
        || Object.has(changes, 'extEnum')
        || Object.has(changes, 'optionLabel')
        || Object.has(changes, 'nullOption')
        || Object.has(changes, 'nullOptionLabel')
    ){
      this.initOptions();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private initOptions() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this._innerOptions = [];
    if(this.nullOption){
      this._innerOptions.push({ key: null, label: this.nullOptionLabel, value: null });
    }
    if(this.options != null){
      if(this.options['length'] === 0){
        return;
      }
      if (this.options instanceof Observable) {
        this.subscription = this.options.subscribe(this.setupOptions.bind(this));
      } else {
        this.setupOptions(this.options);
      }
    }else if(this.remoteData != null){
      let remoteDataType = this.remoteDataService.getType(this.remoteData);
      if(remoteDataType.ensure){
        this.setupOptions(this.remoteDataService.get(remoteDataType));
      }else{
        this.remoteDataService.getAsAsync(remoteDataType).then((data) => {
          this.setupOptions(data);
        });
      }
    }else if(this.extEnum != null){
      this.setupOptions(this.extEnumService.getValues(this.extEnum));
    }
  }
  private setupOptions(options: any[]) {
    for(let option of options){
      let key = this.getOptionKey(option);
      let label = this.getOptionLabel(option);
      let value = this.getOptionValue(option);
      this._innerOptions.push({ key: key, label: label, value: value });
    }
    this._innerSelectValue = this.getOptionKey(this.value);
  }
  private getOptionKey(option: any){
    if(this.optionKey == null || !Object.isObject(option)){
      return option;
    }
    return option[this.optionKey];
  }
  private getOptionLabel(option: any){
    if(this.optionLabel == null || !Object.isObject(option)){
      return option;
    }
    return option[this.optionLabel];
  }
  private getOptionValue(option: any){
    if(this.optionValue == null || !Object.isObject(option)){
      return option;
    }
    return option[this.optionValue];
  }
}

export interface SelectOption {
  key: any;
  label: string;
  value: any;
}
