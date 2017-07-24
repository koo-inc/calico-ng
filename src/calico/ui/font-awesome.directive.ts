import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cFontAwesome]',
})
export class FontAwesomeDirective implements OnInit {
  @Input('cFontAwesome') fontAwesome: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.addClass(el.nativeElement, "fa");
  }

  ngOnInit(): void {
    if (this.fontAwesome == null) return;
    if (this.fontAwesome.match(/^\s*$/)) return;
    this.renderer.addClass(this.el.nativeElement, `fa-${this.fontAwesome.trim()}`);
  }
}
