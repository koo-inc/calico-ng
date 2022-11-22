import { Injector } from '@angular/core';
import { FormItem } from "./item";
export declare class FileComponent extends FormItem {
    private loading;
    constructor(injector: Injector);
    readonly state: 'loading' | 'input' | 'acceptable';
    private change(input);
    private clearValue();
}
