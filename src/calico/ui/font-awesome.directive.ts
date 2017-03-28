import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[cFontAwesome]',
})
export class FontAwesomeDirective implements OnInit {
  @Input('cFontAwesome') fontAwesome: string;

  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, "fa", true);
  }

  ngOnInit(): void {
    if (this.fontAwesome == null) return;
    if (this.fontAwesome.match(/^\s*$/)) return;
    this.renderer.setElementClass(this.el.nativeElement, `fa-${this.fontAwesome.trim()}`, true);
  }
}
