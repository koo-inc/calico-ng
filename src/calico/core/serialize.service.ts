import {Injectable} from '@angular/core';
import {compressToEncodedURIComponent, decompressFromEncodedURIComponent} from 'lz-string';

@Injectable()
export class SerializeService {
  serialize(obj: any): string {
    return compressToEncodedURIComponent(JSON.stringify(obj));
  }
  deserialize<T>(str: string): T {
    try {
      return JSON.parse(decompressFromEncodedURIComponent(str || '')) as T;
    } catch (e) {
      return null;
    }
  }
}

