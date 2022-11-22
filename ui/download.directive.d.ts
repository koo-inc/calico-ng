import { OnChanges, SimpleChanges, Renderer2, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { Media } from "../type/media";
export declare class DownloadDirective implements OnInit, OnChanges {
    private el;
    private renderer;
    file: Media;
    fileChange: EventEmitter<{}>;
    onetime: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
    download(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private toggle();
}
