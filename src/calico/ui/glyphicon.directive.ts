import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cGlyphicon]',
})
export class GlyphiconDirective implements OnInit {
  @Input('cGlyphicon') glyphicon: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.addClass(el.nativeElement, "glyphicon");
  }

  ngOnInit(): void {
    if (this.glyphicon == null) return;
    if (this.glyphicon.match(/^\s*$/)) return;
    this.renderer.addClass(this.el.nativeElement, `glyphicon-${this.glyphicon.trim()}`);
  }
}
