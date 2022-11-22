import { ElementRef, AfterContentChecked, Renderer2, Injector } from '@angular/core';
import { NgControl, FormGroup, FormArray } from "@angular/forms";
import { MessageConfig } from "../core";
export declare class ErrorTipComponent implements AfterContentChecked {
    private messages;
    private el;
    private renderer;
    private injector;
    target: NgControl | FormGroup | FormArray;
    private form;
    constructor(messages: MessageConfig, el: ElementRef, renderer: Renderer2, injector: Injector);
    ngAfterContentChecked(): void;
    display(): string;
    excited(): boolean;
    getKeys(): string[];
}
