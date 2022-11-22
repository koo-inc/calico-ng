import { Injector } from '@angular/core';
import { FormattedTextFormItem } from "./item";
export declare class IntegerComponent extends FormattedTextFormItem<number> {
    constructor(injector: Injector);
    placeholder: string;
    allowNegative: boolean;
    separation: boolean;
    validFormat(textValue: string): boolean;
    toVal(textValue: string): number;
    formatVal(value: number): string;
}
