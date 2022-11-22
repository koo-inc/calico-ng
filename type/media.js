import { encode } from "../util/arraybuf/index";
export var Media;
(function (Media) {
    function of(meta, payload) {
        return {
            meta: meta,
            payload: payload
        };
    }
    Media.of = of;
    function read(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(Media.of(MediaMeta.of(file), encode(reader.result)));
            };
            reader.onerror = function (e) {
                reject(e);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    Media.read = read;
})(Media || (Media = {}));
export var MediaMeta;
(function (MediaMeta) {
    function of(file) {
        return {
            name: file.name != '' ? file.name : '新規ファイル',
            size: file.size > 0 ? file.size : 0,
            type: file.type != '' ? file.type : 'application/octet-stream'
        };
    }
    MediaMeta.of = of;
})(MediaMeta || (MediaMeta = {}));
//# sourceMappingURL=media.js.map