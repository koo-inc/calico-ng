// String#fromCharCode に渡す配列のサイズを制限する必要あり。数値は Google closure library のパフォーマンステストに使われた数値より小さく 8 と 6 の公倍数。
// http://stackoverflow.com/questions/22747068/is-there-a-max-number-of-arguments-javascript-functions-can-accept
var CHUNK_SIZE = 8184;
export function encode(arrayBuf) {
    var result = '';
    for (var i = 0, len = arrayBuf.byteLength; i < len; i += CHUNK_SIZE) {
        result += btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuf, i, Math.min(CHUNK_SIZE, len - i))));
    }
    return result;
}
export function decode(encoded) {
    var str = atob(encoded);
    var bytes = new Uint8Array(str.length);
    for (var i = 0, len = str.length; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}
//# sourceMappingURL=index.js.map