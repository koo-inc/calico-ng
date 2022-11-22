import { decode } from "../arraybuf";
var _download;
if ('saveBlob' in window.navigator) {
    _download = function (blob, name) {
        window.navigator['saveBlob'](blob, name);
    };
}
else if ('msSaveBlob' in window.navigator) {
    _download = function (blob, name) {
        window.navigator['msSaveBlob'](blob, name);
    };
}
else {
    _download = function (blob, name) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", name);
        var e = document.createEvent('MouseEvent');
        e.initEvent('click', true, false);
        a.dispatchEvent(e);
    };
}
export function download(media) {
    _download(new Blob([decode(media.payload)]), media.meta.name);
}
//# sourceMappingURL=index.js.map