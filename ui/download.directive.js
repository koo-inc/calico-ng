import { Directive, Input, HostListener, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { Media } from "../type/media";
import { download } from "../util/file/index";
var DownloadDirective = /** @class */ (function () {
    function DownloadDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.fileChange = new EventEmitter();
        this.onetime = true;
    }
    DownloadDirective.prototype.download = function () {
        if (this.file != null) {
            download(this.file);
            if (this.onetime) {
                this.file = null;
                this.toggle();
                this.fileChange.emit(null);
            }
        }
    };
    DownloadDirective.prototype.ngOnInit = function () {
        this.toggle();
    };
    DownloadDirective.prototype.ngOnChanges = function (changes) {
        if ('file' in changes) {
            this.toggle();
        }
    };
    DownloadDirective.prototype.toggle = function () {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', this.file == null);
    };
    DownloadDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cDownload]',
                },] },
    ];
    /** @nocollapse */
    DownloadDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    DownloadDirective.propDecorators = {
        file: [{ type: Input, args: ['cDownload',] }],
        fileChange: [{ type: Output, args: ['cDownloadChange',] }],
        onetime: [{ type: Input }],
        download: [{ type: HostListener, args: ['click',] }]
    };
    return DownloadDirective;
}());
export { DownloadDirective };
//# sourceMappingURL=download.directive.js.map