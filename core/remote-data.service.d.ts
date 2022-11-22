import { InjectionToken, Injector } from '@angular/core';
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
    ensure?: boolean;
}
export declare const REMOTE_DATA_TYPE: InjectionToken<RemoteDataType<any>>;
export declare class RemoteDataService {
    private holderMap;
    constructor(types: RemoteDataType<any>[], localStorageService: LocalStorageService, api: Api, injector: Injector);
    private static normalizeType(type);
    private getHolder<T>(type);
    getType(key: string): RemoteDataType<any>;
    get<T>(type: RemoteDataType<T>): T;
    getAsAsync<T>(type: RemoteDataType<T>): Promise<T>;
    discardCache(type: RemoteDataType<any>): void;
    ensure(): Promise<boolean>;
}
export declare class EnsureRemoteData implements CanActivateChild {
    private remoteDataService;
    constructor(remoteDataService: RemoteDataService);
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
