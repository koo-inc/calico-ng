import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Api } from "./api.service";
import { LocalStorageService } from "./local-storage.service";

export interface RemoteDataType<T> {
  key: string;
  apiPath: string;
  apiForm?: (injector: Injector) => any;
  transform?: (rawData: any) => T;
  expired?: (rawData: any) => boolean;
  localStorageCahche?: boolean;
}
export const REMOTE_DATA_TYPE = new InjectionToken<RemoteDataType<any>>('RemoteDataType');

const LOCAL_STORAGE_PREFIX = 'RemoteData.';

@Injectable()
export class RemoteDataService {
  private holderMap: {[key: string]: RemoteDataHolder<any>} = {};

  constructor(
    @Optional() @Inject(REMOTE_DATA_TYPE) types: RemoteDataType<any>[],
    localStorageService: LocalStorageService,
    api: Api,
    injector: Injector,
  ) {
    if(types){
      types.forEach((type) => {
        RemoteDataService.normalizeType(type);
        this.holderMap[type.key] = new RemoteDataHolder(type, localStorageService, api, injector);
      });
    }
  }

  private static normalizeType(type: RemoteDataType<any>): void {
    if(type.apiForm == null){
      type.apiForm = () => {};
    }
    if(type.transform == null){
      type.transform = (rawData: any) => rawData;
    }
    if(type.expired == null){
      type.expired = () => false;
    }
    if(type.localStorageCahche == null){
      type.localStorageCahche = true;
    }
  }

  private getHolder<T>(type: RemoteDataType<T>): RemoteDataHolder<T> {
    return this.holderMap[type.key] as RemoteDataHolder<T>;
  }

  get<T>(type: RemoteDataType<T>): T {
    return this.getHolder(type).get();
  }

  getAsAsync<T>(type: RemoteDataType<T>): Promise<T> {
    return this.getHolder(type).getAsAsync();
  }

  discardCache(type: RemoteDataType<any>) {
    this.getHolder(type).discardCache();
  }

  ensure(): Promise<boolean> {
    return Promise.all(
      Object.keys(this.holderMap).map((key: string) => this.holderMap[key].getAsAsync())
    ).then(() => true);
  }
}

class RemoteDataHolder<T> {
  private rawData: any;
  private data: T;
  private localStorageKey: string;
  private submitting: Promise<T>;

  constructor(
    private type: RemoteDataType<any>,
    private localStorageService: LocalStorageService,
    private api: Api,
    private injector: Injector,
  ){
    this.localStorageKey = LOCAL_STORAGE_PREFIX + type.key;
  }

  get(): T {
    if(this.data == null){
      throw new Error('RemoteData.' + this.type.key + ' is null');
    }
    return this.data;
  }

  getAsAsync(): Promise<T> {
    return new Promise((resolve, reject) => {
      // from memory
      if (this.rawData && this.data && !this.type.expired(this.rawData)){
        resolve(this.data);
        return;
      }

      // from localStorage
      if(this.type.localStorageCahche){
        let storedData = this.localStorageService.restore(this.localStorageKey, true);
        if (storedData && !this.type.expired(storedData)) {
          this.rawData = storedData;
          this.data = this.type.transform(storedData);
          resolve(this.data);
          return;
        }
      }

      // submitting
      if(this.submitting){
        this.submitting.then((data) => {
          resolve(data);
        });
        return;
      }

      // from api
      this.submitting = this.api.submit(this.type.apiPath, this.type.apiForm(this.injector)).toPromise().then(data => {
        this.rawData = data;
        this.data = this.type.transform(data);
        if(this.type.localStorageCahche){
          this.localStorageService.store(this.localStorageKey, this.rawData, true);
        }
        resolve(this.data);
        this.submitting = null;
        return this.data;
      });
    });
  }

  discardCache(): void {
    this.rawData = null;
    this.data = null;
    if(this.type.localStorageCahche){
      this.localStorageService.remove(this.localStorageKey, true);
    }
  }
}

@Injectable()
export class EnsureRemoteData implements CanActivateChild {
  constructor(
    private remoteDataService: RemoteDataService,
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.remoteDataService.ensure();
  }
}
