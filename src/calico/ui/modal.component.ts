import {
  Component, Input, ContentChild, ViewChild, EventEmitter, Output, ElementRef, OnInit,
  Inject
} from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'c-modal-header',
  template: '<ng-content></ng-content>'
})
export class ModalHeaderComponent {}

@Component({
  selector: 'c-modal-footer',
  template: '<ng-content></ng-content>'
})
export class ModalFooterComponent {}

@Component({
  selector: 'c-modal',
  template: `
    <div bsModal #modal="bs-modal"
        [config]="{backdrop: backdrop, ignoreBackdropClick: ignoreBackdropClick, keyboard: keyboard}"
        (onShow)="_innerOnShow($event)"
        (onHidden)="_innerOnHidden($event)"
        class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" [class.modal-sm]="isSmall" [class.modal-lg]="isLarge">
        <div class="modal-content">
          <div class="modal-header" *ngIf="showHeader">
            <button *ngIf="closeButton" type="button" class="close pull-right" aria-label="Close" (click)="modal.hide()"><span>&times;</span></button>
            {{heading}}
            <ng-content select="c-modal-header"></ng-content>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer" *ngIf="showFooter">
            <ng-content select="c-modal-footer"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements OnInit {

  @Input() heading: string;
  @Input() size: string;
  @Input() closeButton: boolean = true;
  @Input() backdrop: boolean | "static" = true;
  @Input() ignoreBackdropClick: boolean = false;
  @Input() keyboard: boolean = true;

  @Output() onShow = new EventEmitter<ModalDirective>();
  @Output() onHide = new EventEmitter<ModalDirective>();

  toggle(): void {
    this.modalDirective.toggle();
  }

  show(): void {
    this.modalDirective.show();
  }

  hide(event?: Event): void {
    this.modalDirective.hide(event);
  }

  @ViewChild(ModalDirective)
  modalDirective: ModalDirective;
  shown: boolean = false;

  _innerOnShow(event: any): void {
    this.shown = true;
    this.onShow.emit(event);
  }

  _innerOnHidden(event: any): void {
    this.shown = false;
    this.onHide.emit(event);
  }

  @ContentChild(ModalHeaderComponent) header: ModalHeaderComponent;
  @ContentChild(ModalFooterComponent) footer: ModalFooterComponent;

  get showHeader(): boolean {
    return this.header != null || this.heading != null || this.closeButton;
  }

  get showFooter(): boolean {
    return this.footer != null;
  }

  get isSmall(): boolean {
    if(this.size == null) return false;
    return this.size.indexOf('sm') != -1 || this.size.indexOf('small') != -1;
  }

  get isLarge(): boolean {
    if(this.size == null) return false;
    return this.size.indexOf('lg') != -1 || this.size.indexOf('large') != -1;
  }

  /**
   * TABフォーカス制限
   */
  private view: any;
  private focusListener: (e: any) => void;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private elem: ElementRef,
  ) {
    this.view = doc.defaultView || {
        addEventListener: (type: string, listener: (e: any) => void, useCapture: boolean) => { },
        removeEventListener: (type: string, listener: (e: any) => void, useCapture: boolean) => { },
      };
    this.focusListener = (e: any) => {
      let having = this.having([this.elem.nativeElement], e.target);
      if (!having) {
        this.elem.nativeElement.firstElementChild.focus();
      }
    };
  }
  ngOnInit(): void {
    this.view.addEventListener('focus', this.focusListener, true);
  }
  private having(elements: any[], target: any): boolean {
    if (elements == null) return false;

    for (let element of elements) {
      if (target === element) {
        return true;
      }
      if (this.having(element.children, target)) {
        return true;
      }
    }
    return false;
  }

}
