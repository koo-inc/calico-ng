import { Injectable, InjectionToken, Injector } from '@angular/core';
import {Observable} from "rxjs";

import { Api } from "./api.service";
import { LocalStorageService } from "./local-storage.service";

export const EXT_ENUM_SERVICE_CONFIG = new InjectionToken<ExtEnumServiceConfig>('ExtEnumServiceConfig');

declare type RequestCache = {
  key: string;
  value: ExtEnum[];
};

let requestCache: {[key: string]: Promise<RequestCache>} = {};
let keyBuffer: string[] = [];
let resolverCache = {};

@Injectable()
export class ExtEnumService {
  private apiPath: string;
  private cacheKeyPrefix: string = 'extenum:';

  constructor(
    private api: Api,
    private localStorageService: LocalStorageService,
    injector: Injector,
  ) {
    let config: ExtEnumServiceConfig;
    try {
      config = injector.get(EXT_ENUM_SERVICE_CONFIG);
    }
    catch (e) {
      console.warn("use EXT_ENUM_SERVICE_CONFIG token to provide ExtEnumServiceConfig instead of 'ExtEnumServiceConfig' string.");
      config = injector.get("ExtEnumServiceConfig", null);
    }
    if (config != null) {
      this.apiPath = config.apiPath;
      if(config.cacheKeyPrefix != null){
        this.cacheKeyPrefix = config.cacheKeyPrefix;
      }
    }
    if(this.apiPath == null){
      throw 'ExtEnumService.apiPath is undefined';
    }
  }

  setValues(target: {}, ...keys: string[]): void {
    if(keys == null || keys.length == 0 || target == null){
      return;
    }
    this.values(...keys).subscribe(data => {
      keys.forEach(key => {
        target[key] = data[key];
      });
    });
  }

  values(...keys: string[]): Observable<ExtEnumData> {
    let observable = keys.map((key:string) => this.getValueStream(key))
      .reduce((a: Observable<RequestCache>, b: Observable<RequestCache>) => a.merge(b)) as Observable<RequestCache>;

    return observable
      .bufferCount(keys.length)
      .map((list: {key: string, value: ExtEnum[]}[]) => {
        let data = {};
        for (let item of list) {
          data[item.key] = item.value;
        }
        return data;
      });
  }

  private getValueStream(key: string): Observable<RequestCache> {
    let cache = this.localStorageService.restore(this.createCacheKey(key), true);
    if (cache) return Observable.of({key: key, value: cache});

    let request = requestCache[key];
    if (request != null) return Observable.fromPromise(request);

    keyBuffer.push(key);

    request = new Promise<RequestCache>((resolve, reject) => {
      resolverCache[key] = {resolve: resolve, reject: reject};
      setTimeout(() => {
        let keys = keyBuffer.clone();
        keyBuffer.length = 0;
        this.fromApi(keys).subscribe(
          data => {
            keys.forEach(k => {
              this.localStorageService.store(this.createCacheKey(k), data[k], true)
              let resolver = resolverCache[k];
              delete resolverCache[k];
              delete requestCache[k];
              resolver.resolve({key: k, value: data[k]});
            });
          },
          err => keys.forEach(k => {
            let resolver = resolverCache[k];
            delete resolverCache[k];
            resolver.reject(k)
          })
        );
      }, 100);
    });
    requestCache[key] = request;
    return Observable.fromPromise(request);
  }

  private fromApi(keys: string[]): Observable<ExtEnumData> {
    if(keys.length == 0){
      return Observable.of(new ExtEnumData());
    }
    return this.api.submit(this.apiPath, {keys: keys});
  }

  private createCacheKey(key: string): string {
    return this.cacheKeyPrefix + key;
  }
}

export interface ExtEnumServiceConfig {
  apiPath: string;
  cacheKeyPrefix?: string;
}

export class ExtEnum {
  NAME: string;
  id: any;
  name: string;
}

export class ExtEnumData {
  [key:string]: ExtEnum[];
}
