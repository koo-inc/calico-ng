import {Injectable} from '@angular/core';

@Injectable()
export class SerializeService {
  serialize(obj: any): string {
    return JSON.stringify(obj).encodeBase64();
  }
  deserialize<T>(str: string): T {
    try {
      return JSON.parse((str || '').decodeBase64()) as T;
    } catch (e) {
      return null;
    }
  }
}

