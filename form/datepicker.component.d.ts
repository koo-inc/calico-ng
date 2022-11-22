import { Injector } from '@angular/core';
import { FormItem } from "./item";
import { PopoverDirective } from "../ui/popover.directive";
export declare class DatepickerComponent extends FormItem {
    constructor(injector: Injector);
    defaultDate: Date;
    minDate: Date;
    maxDate: Date;
    placeholder: string;
    strictType: boolean;
    innerTextValue: string;
    textChanged: boolean;
    textValue: string;
    isInvalidText(): boolean;
    adjustTextValue(): void;
    innerDatepickerValue: Date;
    datepickerValue: Date;
    writeValue(value: any): void;
    private toDate(value);
    private formatDate(value);
    popover: PopoverDirective;
    keepFlag: boolean;
    keep(): void;
    onClick($event: any): void;
    onFocus($event: any): void;
    onBlur($event: any): void;
}
