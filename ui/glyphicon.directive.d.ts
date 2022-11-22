import { OnInit, ElementRef, Renderer2 } from '@angular/core';
export declare class GlyphiconDirective implements OnInit {
    private el;
    private renderer;
    glyphicon: string;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
