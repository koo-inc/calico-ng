import { Injectable, InjectionToken, Injector } from '@angular/core';
import {SerializeService} from "./serialize.service";

export interface LocalStorageServiceConfig {
  storage?: Storage;
  prefix?: string;
  version?: string;
}

export const LOCAL_STORAGE_SERVICE_CONFIG = new InjectionToken<LocalStorageServiceConfig>('LocalStorageServiceConfig');

@Injectable()
export class LocalStorageService {
  private localStorage: Storage;
  private prefix: string;
  private version: string;

  constructor(private serializeService: SerializeService, injector: Injector) {
    let config: LocalStorageServiceConfig;
    try {
      config = injector.get(LOCAL_STORAGE_SERVICE_CONFIG);
    }
    catch(e) {
      console.warn("use LOCAL_STORAGE_SERVICE_CONFIG token to provide LocalStorageServiceConfig instead of 'LocalStorageServiceConfig' string.");
      config = injector.get("LocalStorageServiceConfig", null);
    }
    if (config != null) {
      this.localStorage = config.storage;
      this.prefix = config.prefix;
      this.version = config.version;
    }

    if (this.localStorage == null && 'localStorage' in global) {
      this.localStorage = localStorage;
    }
    else {
      throw new Error("this browser doesn't support Local Storage.")
    }
    if (this.prefix == null) {
      this.prefix = '';
    }

    if (this.version == null) {
      this.version = Date.now() + '';
    }
  }

  store(key: string, value: any): void;
  store(key: string, value: any, withVersion: boolean): void;
  store(key: string, value: any, withVersion?: boolean): void {
    key = this.createKey(key, withVersion);
    this.localStorage.setItem(key, this.serializeService.serialize(value));
  }
  restore(key: string): any;
  restore(key: string, withVersion: boolean): any;
  restore(key: string, withVersion?: boolean): any {
    return this.serializeService.deserialize(this.restoreRawData(key, withVersion));
  }
  restoreRawData(key: string): string;
  restoreRawData(key: string, withVersion: boolean): string;
  restoreRawData(key: string, withVersion?: boolean): string {
    key = this.createKey(key, withVersion);
    return this.localStorage.getItem(key);
  }

  remove(key: string): void;
  remove(key: string, withVersion: boolean): void;
  remove(key: string, withVersion?: boolean): void {
    key = this.createKey(key, withVersion);
    this.localStorage.removeItem(key);
  }

  clear(): void;
  clear(matchKey: string): void;
  clear(matchKey: string, withVersion: boolean): void;
  clear(matchKey?: string, withVersion?: boolean): void {
    matchKey = this.createKey(matchKey == null ? '' : matchKey, withVersion);
    this.removeMatched(matchKey);
  }

  clearByVersion(version: string) {
    this.removeMatched(this.prefix + version + '-');
  }

  private keyPrefix(withVersion?: boolean): string {
    return withVersion === true ? this.prefix + this.version + '-' : this.prefix;
  }
  private createKey(key: string, withVersion?: boolean): string {
    return this.keyPrefix(withVersion) + key;
  }

  private removeMatched(matchKey: string): void {
    if (matchKey == '') {
      this.localStorage.clear();
      return;
    }
    let keys: string[] = [];
    for(let i = 0; i < this.localStorage.length; i++) {
      keys.push(this.localStorage.key(i));
    }
    keys.forEach(key => {
      if (key.startsWith(matchKey)) {
        this.localStorage.removeItem(key);
      }
    });
  }
}

