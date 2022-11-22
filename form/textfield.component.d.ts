import { Injector, EventEmitter } from '@angular/core';
import { FormItem } from "./item";
export declare class TextFieldComponent extends FormItem {
    constructor(injector: Injector);
    placeholder: string;
    cEnter: EventEmitter<{}>;
    fireEnter($event: any): void;
}
