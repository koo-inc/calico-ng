import {
  Directive, Input, HostListener, OnChanges, SimpleChanges, Renderer2, ElementRef, OnInit,
  Output, EventEmitter
} from '@angular/core';
import { Media } from "../type/media";
import { download } from "../util/file/index";

@Directive({
  selector: '[cDownload]',
})
export class DownloadDirective implements OnInit, OnChanges {
  @Input('cDownload') file: Media;
  @Output('cDownloadChange') fileChange = new EventEmitter();

  @Input() onetime = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click')
  download() {
    if (this.file != null) {
      download(this.file);
      if (this.onetime) {
        this.file = null;
        this.toggle();
        this.fileChange.emit(null);
      }
    }
  }

  ngOnInit(): void {
    this.toggle();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('file' in changes) {
      this.toggle();
    }
  }

  private toggle() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', this.file == null);
  }
}
