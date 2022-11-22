import { Injector, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from "@angular/forms";
export declare abstract class FormItem implements ControlValueAccessor, OnInit, OnChanges {
    private injector;
    readonly: boolean;
    inputValue: any;
    cChange: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    innerValue: any;
    control: NgControl;
    onTouchedCallback: () => void;
    onChangeCallback: (_: any) => void;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    isInvalid(): boolean;
    addError(key: string): void;
    removeError(key: string): void;
}
export declare abstract class FormattedTextFormItem<T> extends FormItem {
    abstract validFormat(textValue: string): boolean;
    abstract toVal(textValue: string): T;
    abstract formatVal(value: T): string;
    innerTextValue: string;
    textValueInvalid: boolean;
    textValueChanged: boolean;
    formatErrorMessage: string;
    textValue: string;
    formatTextValue(): void;
    setFormatError(): void;
    writeValue(value: T): void;
}
