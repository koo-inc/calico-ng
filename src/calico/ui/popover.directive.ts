import {
  ViewContainerRef, ElementRef, TemplateRef, Directive, Input, Output, OnDestroy, Renderer2, EventEmitter
} from "@angular/core";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";
import { PopoverConfig } from "ngx-bootstrap/popover";
import { PopoverDirective as NgPopoverDirective } from "ngx-bootstrap/popover";

class PopoverListener {
  popovers: PopoverDirective[] = [];
  private _triggerEvents = ['focus', 'mousedown', 'touchstart', 'click'];

  private _listener: (e: Event) => void;

  constructor() {
    this._listener = (function(e: Event) {
      for (let i = this.popovers.length - 1; i >= 0; i--) {
        let removed = this.popovers[i]._removeIfNotHaving(e.target as HTMLElement);
        if (removed == null) {
          return;
        }
      }
    }).throttle(500).bind(this);
  }

  attach(popover: PopoverDirective): void {
    setTimeout(() => {
      if (this.popovers.length == 0) {
        this._triggerEvents.forEach(e => {
          window.addEventListener(e, this._listener, false);
        });
      }
      this.popovers.push(popover);
    }, 0);
  }
  detach(popover: PopoverDirective): void {
    let i = this.popovers.indexOf(popover);
    if (i < 0) return;
    this.popovers.length = i;
    if (this.popovers.length == 0) {
      this._triggerEvents.forEach(e => {
        window.removeEventListener(e, this._listener, false);
      });
    }
  }

  clear(): void {
    for (let i = this.popovers.length - 1; i >= 0; i--) {
      this.popovers[i].close();
    }
  }
}

let listener = new PopoverListener();

@Directive({
  selector: '[cPopover]',
  exportAs: 'cPopover',
})
export class PopoverDirective implements OnDestroy {

  private popover: NgPopoverDirective;

  @Input()
  set cPopover(popover: string | TemplateRef<any>) {
    this.popover.popover = popover;
  }

  @Output('beforeClose')
  private beforeCloseEv = new EventEmitter();

  @Output('close')
  private closeEv = new EventEmitter();

  @Output('beforeOpen')
  private beforeOpenEv = new EventEmitter();

  @Output('open')
  private openEv = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    cis: ComponentLoaderFactory
  ) {
    let config = new PopoverConfig();
    config.container = 'body';
    config.placement = 'bottom';
    config.triggers = '';
    this.popover = new NgPopoverDirective(elementRef, renderer, viewContainerRef, config, cis);
  }

  get isOpen(): boolean {
    return this.popover.isOpen;
  }

  open(): void {
    if (!this.isOpen) {
      this.beforeOpenEv.emit();
      this.popover.show();
      let lastPopover = listener.popovers.last();
      if (lastPopover != null && !lastPopover.having(this.elementRef.nativeElement)) {
        listener.clear();
      }
      listener.attach(this);
      this.openEv.emit();
    }
  }

  close(): void {
    if (this.isOpen) {
      this.beforeCloseEv.emit();
      this.popover.hide();
      listener.detach(this);
      this.closeEv.emit();
    }
  }

  toggle(): void {
    if (this.isOpen) {
      return this.close();
    }
    this.open();
  }

  ngOnDestroy(): void {
    this.close();
    listener.detach(this);
  }

  private get popoverContent(): HTMLElement {
    return this.popover['_popover']['_componentRef']['_viewRef']['rootNodes'][0] as HTMLElement;
  }

  _removeIfNotHaving(elm: HTMLElement) {
    if (!this.having(elm)) {
      this.close();
      return this;
    }
    return null;
  }

  private having(target: HTMLElement): boolean {
    return this._having([this.elementRef.nativeElement].concat(this.popoverContent), target);
  }

  private _having(elements: HTMLCollection | HTMLElement[], target: HTMLElement): boolean {
    if (elements == null) return false;

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (target === element) {
        return true;
      }
      if (this._having(element.children, target)) {
        return true;
      }
    }
    return false;
  }
}
