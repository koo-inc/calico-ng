import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cBtn]',
})
export class ButtonDirective implements OnInit {
  @Input('cBtn') buttonType: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.addClass(el.nativeElement, "btn");
  }

  ngOnInit(): void {
    if (this.buttonType == null) return;
    this.buttonType.split(/[,\s]+/).forEach(type => {
      if (type.trim() == null) return;
      this.renderer.addClass(this.el.nativeElement, `btn-${type.trim()}`);
    });
  }
}
