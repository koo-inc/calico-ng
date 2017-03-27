import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[cBtn]',
})
export class ButtonDirective implements OnInit {
  @Input('cBtn') buttonType: string;

  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, "btn", true);
  }

  ngOnInit(): void {
    if (this.buttonType == null) return;
    this.buttonType.split(/[,\s]+/).forEach(type => {
      if (type.trim() == null) return;
      this.renderer.setElementClass(this.el.nativeElement, `btn-${type.trim()}`, true)});
  }
}
