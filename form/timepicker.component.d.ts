import { Injector } from '@angular/core';
import { PopoverDirective } from "../ui/popover.directive";
import { FormItem } from "./item";
export declare class TimepickerComponent extends FormItem {
    constructor(injector: Injector);
    defaultDate: Date;
    min: Date;
    max: Date;
    stepHour: number;
    stepMinute: number;
    placeholder: string;
    strictType: boolean;
    innerTextValue: string;
    textChanged: boolean;
    textValue: string;
    isInvalidText(): boolean;
    adjustTextValue(): void;
    innerTimepickerValue: Date;
    timepickerValue: Date;
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
