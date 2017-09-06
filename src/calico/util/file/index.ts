import { Media } from "../../type/media";
import { decode } from "../arraybuf";

let _download: (blob: Blob, name: string) => void;

if ('saveBlob' in window.navigator) {
  _download = (blob, name) => {
    window.navigator['saveBlob'](blob, name);
  };
}
else if ('msSaveBlob' in window.navigator) {
  _download = (blob, name) => {
    window.navigator['msSaveBlob'](blob, name);
  }
}
else {
  _download = (blob, name) => {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", name);
    let e = document.createEvent('MouseEvent');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
  };
}

export function download(media: Media) {
  _download(new Blob([decode(media.payload)]), media.meta.name);
}
