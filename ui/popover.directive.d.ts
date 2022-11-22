import { ViewContainerRef, ElementRef, TemplateRef, OnDestroy, Renderer2 } from "@angular/core";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";
export declare class PopoverDirective implements OnDestroy {
    private elementRef;
    private popover;
    cPopover: string | TemplateRef<any>;
    private beforeCloseEv;
    private closeEv;
    private beforeOpenEv;
    private openEv;
    constructor(elementRef: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    readonly isOpen: boolean;
    open(): void;
    close(): void;
    toggle(): void;
    ngOnDestroy(): void;
    private readonly popoverContent;
    _removeIfNotHaving(elm: HTMLElement): this;
    private having(target);
    private _having(elements, target);
}
