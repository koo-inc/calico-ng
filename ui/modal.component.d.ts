import { EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
export declare class ModalHeaderComponent {
}
export declare class ModalFooterComponent {
}
export declare class ModalComponent implements OnInit {
    private doc;
    private elem;
    heading: string;
    size: string;
    closeButton: boolean;
    backdrop: boolean | "static";
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    onShow: EventEmitter<ModalDirective>;
    onHide: EventEmitter<ModalDirective>;
    toggle(): void;
    show(): void;
    hide(event?: Event): void;
    modalDirective: ModalDirective;
    shown: boolean;
    _innerOnShow(event: any): void;
    _innerOnHidden(event: any): void;
    header: ModalHeaderComponent;
    footer: ModalFooterComponent;
    readonly showHeader: boolean;
    readonly showFooter: boolean;
    readonly isSmall: boolean;
    readonly isLarge: boolean;
    /**
     * TABフォーカス制限
     */
    private view;
    private focusListener;
    constructor(doc: any, elem: ElementRef);
    ngOnInit(): void;
    private having(elements, target);
}
