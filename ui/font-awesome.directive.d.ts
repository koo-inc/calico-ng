import { OnInit, ElementRef, Renderer2 } from '@angular/core';
export declare class FontAwesomeDirective implements OnInit {
    private el;
    private renderer;
    fontAwesome: string;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
