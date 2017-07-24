import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cListTable]'
})
export class ListTableDirective implements OnInit, OnChanges {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.toggleClass("table", true);
    this.toggleClass("table-bordered", true);
    this.toggleClass("table-list", true);
  }

  @Input() hover: boolean = true;
  @Input() striped: boolean = true;

  ngOnInit(): void {
    this.toggleClass("table-hover", this.hover);
    this.toggleClass("table-striped", this.striped);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleClass("table-hover", this.hover);
    this.toggleClass("table-striped", this.striped);
  }

  private toggleClass(className: string, enabled: boolean) {
    if (enabled) {
      this.renderer.addClass(this.el.nativeElement, className);
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, className);
    }
  }
}

@Directive({
  selector: '[cInfoTable]'
})
export class InfoTableDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.addClass(el.nativeElement, "table");
    renderer.addClass(el.nativeElement, "table-bordered");
    renderer.addClass(el.nativeElement, "table-info");
  }
}
