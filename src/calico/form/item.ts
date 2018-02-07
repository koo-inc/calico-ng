import { Input, Injector, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControlName, NgControl } from "@angular/forms";

const noop = () => {};

const valueOf = (val: any) => val != null ? val.valueOf() : val;

export abstract class FormItem implements ControlValueAccessor, OnInit, OnChanges {
  @Input() readonly: boolean = false;
  @Input("value") inputValue: any;

  @Output() cChange: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  innerValue: any;
  control: NgControl;
  onTouchedCallback = noop;
  onChangeCallback: (_: any) => void = noop;

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
    this.control = this.injector.get(NgControl, null);
    if (this.control == null) {
      this.writeValue(this.inputValue);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('inputValue' in changes) {
      this.value = changes['inputValue'].currentValue;
    }
  }

  get value(): any {
    return this.innerValue;
  }
  set value(value: any) {
    if (valueOf(value) !== valueOf(this.innerValue)) {
      this.innerValue = value;
      this.onChangeCallback(value);
      this.cChange.emit(value);
    }
  }

  writeValue(value: any): void {
    if (valueOf(value) !== valueOf(this.innerValue)) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  isInvalid(): boolean {
    return this.control && this.control.invalid
      && (!(this.control instanceof FormControlName) || this.control.formDirective.submitted);
  }

  addError(key: string): void {
    if (this.control == null) return;
    let errors = this.control.control.errors || {};
    errors[key] = true;
    this.control.control.setErrors(errors);
  }

  removeError(key: string): void {
    if (this.control == null) return;
    let errors = this.control.control.errors || {};
    errors = Object.exclude(errors, (v: any, k: any) => { return k == key;});
    if(Object.keys(errors).length == 0){
      errors = null;
    }
    this.control.control.setErrors(errors);
  }
}

export abstract class FormattedTextFormItem<T> extends FormItem {

  abstract validFormat(textValue: string): boolean;
  abstract toVal(textValue: string): T;
  abstract formatVal(value: T): string;

  innerTextValue: string;
  textValueInvalid: boolean = false;
  textValueChanged: boolean = false;
  formatErrorMessage: string;

  get textValue(): string {
    return this.innerTextValue;
  }
  set textValue(value: string) {
    if (value !== this.innerTextValue) {
      this.innerTextValue = value;
      this.textValueInvalid = !this.validFormat(value);
      this.textValueChanged = true;
      this.value = this.toVal(value);
      this.setFormatError();
    }
  }

  formatTextValue(): void {
    if(!this.textValueChanged) return;
    if(this.value == null) return;
    this.innerTextValue = this.formatVal(this.value);
    this.textValueChanged = false;
  }

  setFormatError(): void {
    if(this.textValueInvalid){
      this.addError(this.formatErrorMessage);
    }else{
      this.removeError(this.formatErrorMessage)
    }
  }

  writeValue(value: T): void {
    super.writeValue(value);

    this.innerTextValue = this.formatVal(value);
    this.textValueInvalid = !this.validFormat(this.innerTextValue);
    this.textValueChanged = false;
    setTimeout(() => {
      this.setFormatError();
    });
  }

}
