
import { encode } from "../../../packages/calico/util/arraybuf/index";

export interface Media {
  id?: string;
  meta: MediaMeta;
  payload: string;
}

export namespace Media {
  export function of(meta: MediaMeta, payload: string): Media {
    return {
      meta: meta,
      payload: payload
    };
  }

  export function read(file: File): Promise<Media> {
    return new Promise<Media>((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(Media.of(
          MediaMeta.of(file),
          encode(reader.result)
        ));
      };
      reader.onerror = (e: ErrorEvent) => {
        reject(e);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}

export interface MediaMeta {
  name: string;
  size: number;
  type: string;
}
export namespace MediaMeta {
  export function of(file: File): MediaMeta {
    return {
      name: file.name != '' ? file.name : '新規ファイル',
      size: file.size > 0 ? file.size : 0,
      type: file.type != '' ? file.type : 'application/octet-stream'
    };
  }
}
