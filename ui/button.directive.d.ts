import { OnInit, ElementRef, Renderer2 } from '@angular/core';
export declare class ButtonDirective implements OnInit {
    private el;
    private renderer;
    buttonType: string;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
