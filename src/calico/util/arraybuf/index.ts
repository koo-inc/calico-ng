
// String#fromCharCode に渡す配列のサイズを制限する必要あり。数値は Google closure library のパフォーマンステストに使われた数値より小さく 8 と 6 の公倍数。
// http://stackoverflow.com/questions/22747068/is-there-a-max-number-of-arguments-javascript-functions-can-accept
const CHUNK_SIZE = 8184;

export function encode(arrayBuf: ArrayBuffer): string {
  let result = '';
  for (let i = 0, len = arrayBuf.byteLength; i < len; i += CHUNK_SIZE) {
    result += btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuf, i, Math.min(CHUNK_SIZE, len - i))));
  }
  return result;
}

export function decode(encoded: string): ArrayBuffer {
  let str = atob(encoded);
  let bytes = new Uint8Array(str.length);
  for (let i = 0, len = str.length; i < len; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes.buffer;
}
