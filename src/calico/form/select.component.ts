import { Component, forwardRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { ExtEnumService } from "../core/ext-enum.service";

@Component({
  selector: 'c-select',
  template: `
    <select class="c-select" [(ngModel)]="selectValue"
      [class.invalid]="isInvalid()"
      [disabled]="readonly"
    >
      <option *ngFor="let e of innerOptions;trackBy:trackBy" [ngValue]="e.key">{{e.label}}</option>
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
  ) {
    super(injector);
  }

  @Input() options: any[] | Observable<any[]> = null;
  @Input() extEnum: string;
  @Input() optionKey: string = 'id';
  @Input() optionLabel: string = 'name';
  @Input() optionValue: string = null;
  @Input() nullOption: boolean = true;
  @Input() nullOptionLabel: string = '----';

  private innerSelectValue: any;
  private innerOptions: SelectOption[];

  private subscription: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    this.initOptions();
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.innerSelectValue = this.getOptionKey(value);
  }

  get selectValue(): any {
    return this.innerSelectValue;
  }
  set selectValue(key: any) {
    if (key !== this.innerSelectValue) {
      this.innerSelectValue = key;
      let option = this.innerOptions.find((e: SelectOption) => e.key == key);
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

    this.innerOptions = [];
    if(this.nullOption){
      this.innerOptions.push({ key: null, label: this.nullOptionLabel, value: null });
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
    }else if(this.extEnum != null){
      this.setupOptions(this.extEnumService.getValues(this.extEnum));
    }
  }
  private setupOptions(options: any[]) {
    for(let option of options){
      let key = this.getOptionKey(option);
      let label = this.getOptionLabel(option);
      let value = this.getOptionValue(option);
      this.innerOptions.push({ key: key, label: label, value: value });
    }
    this.innerSelectValue = this.getOptionKey(this.value);
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

interface SelectOption {
  key: any;
  label: string;
  value: any;
}
