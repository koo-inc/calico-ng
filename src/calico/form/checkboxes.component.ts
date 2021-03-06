import { Component, forwardRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormItem } from "./item";
import { Observable ,  Subscription } from "rxjs";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";
import { isPrimitive } from "../util/object";

@Component({
  selector: 'c-checkboxes',
  template: `
    <span class="btn-group c-checkboxes" [class.invalid]="isInvalid()">
      <button *ngFor="let e of _innerOptions" 
        type="button" class="btn btn-default c-checkbox"
        [disabled]="readonly"
        (click)="click(e)"
      ><span *ngIf="e.selected" class="fa fa-check-square fa-fw"></span><span *ngIf="!e.selected" class="fa fa-square-o fa-fw"></span>{{e.label}}</button>
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
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent extends FormItem implements OnChanges, OnDestroy {
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

  _innerOptions: CheckboxOption[];

  private subscription: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    this.initOptions();
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.setSelected(value);
  }

  private click(option: CheckboxOption): void {
    option.selected = !option.selected;
    this.value = this.getValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(Object.has(changes, 'options')
      || Object.has(changes, 'extEnum')
      || Object.has(changes, 'optionLabel')
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

  private initOptions(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this._innerOptions = [];
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
      this._innerOptions.push({ key: key, label: label, value: value, selected: false });
    }
    this.setSelected(this.value);
  }
  private getOptionKey(option: any): any {
    if(this.optionKey == null || isPrimitive(option)){
      return option;
    }
    return option[this.optionKey];
  }
  private getOptionLabel(option: any): string {
    if(this.optionLabel == null || isPrimitive(option)){
      return option;
    }
    return option[this.optionLabel];
  }
  private getOptionValue(option: any): any {
    if(this.optionValue == null || isPrimitive(option)){
      return option;
    }
    return option[this.optionValue];
  }

  private getValues(): any[] {
    return this._innerOptions
      .filter((e: CheckboxOption) => e.selected)
      .map((e: CheckboxOption) => e.value);
  }
  private setSelected(value: any): void {
    if(value == null || !Object.isArray(value) || value.length == 0){
      return;
    }
    (<any[]>value)
      .map((e: any) => this.getOptionKey(e))
      .map((key: any) => this._innerOptions.find((e: CheckboxOption) => e.key == key))
      .filter((option: CheckboxOption) => option != null)
      .forEach((option: CheckboxOption) => {option.selected = true;})
  }

}

export interface CheckboxOption {
  key: any;
  label: string;
  value: any;
  selected: boolean;
}
