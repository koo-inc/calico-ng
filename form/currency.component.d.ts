import { Injector } from '@angular/core';
import { FormattedTextFormItem } from "./item";
export declare class CurrencyComponent extends FormattedTextFormItem<number> {
    constructor(injector: Injector);
    placeholder: string;
    allowNegative: boolean;
    validFormat(textValue: string): boolean;
    toVal(textValue: string): number;
    formatVal(value: number): string;
}
