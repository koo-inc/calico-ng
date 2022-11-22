import { Injector } from '@angular/core';
import { FormattedTextFormItem } from "./item";
export declare class FloatComponent extends FormattedTextFormItem<number> {
    constructor(injector: Injector);
    placeholder: string;
    step: number;
    allowNegative: boolean;
    ngOnInit(): void;
    validFormat(textValue: string): boolean;
    toVal(textValue: string): number;
    formatVal(value: number): string;
}
