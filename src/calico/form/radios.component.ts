import { Component, forwardRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";

@Component({
  selector: 'c-radios',
  template: `
    <span class="c-radios btn-group" [class.invalid]="isInvalid()">
      <button *ngFor="let e of innerOptions" 
        type="button" class="btn btn-default c-radio"
        [disabled]="readonly"
        [class.active]="e.selected"
        (click)="click(e)"
      >{{e.label}}</button>
    </span>
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
      useExisting: forwardRef(() => RadiosComponent),
      multi: true
    }
  ]
})
export class RadiosComponent extends FormItem implements OnChanges, OnDestroy {
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
  @Input() nullOption: boolean = false;
  @Input() nullOptionLabel: string = '----';

  private innerOptions: RadioOption[];

  private subscription: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    this.initOptions();
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.setSelected(value);
  }

  private click(option: RadioOption) {
    this.setSelected(option.key);
    this.value = option.value;
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
      this.innerOptions.push({ key: null, label: this.nullOptionLabel, value: null, selected: false });
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
      this.innerOptions.push({ key: key, label: label, value: value, selected: false });
    }
    this.setSelected(this.value);
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

  private setSelected(value: any){
    let key = this.getOptionKey(value);
    this.innerOptions.forEach((option) => {
      option.selected = option.key == key;
    });
  }

}

interface RadioOption {
  key: any;
  label: string;
  value: any;
  selected: boolean;
}
