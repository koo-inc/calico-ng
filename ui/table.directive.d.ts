import { ElementRef, OnInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
export declare class ListTableDirective implements OnInit, OnChanges {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer2);
    hover: boolean;
    striped: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private toggleClass(className, enabled);
}
export declare class InfoTableDirective {
    constructor(el: ElementRef, renderer: Renderer2);
}
