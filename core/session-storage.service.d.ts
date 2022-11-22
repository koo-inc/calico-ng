import { InjectionToken, Injector } from '@angular/core';
import { SerializeService } from "./serialize.service";
export interface SessionStorageServiceConfig {
    storage?: Storage;
    prefix?: string;
    version?: string;
}
export declare const SESSION_STORAGE_SERVICE_CONFIG: InjectionToken<SessionStorageServiceConfig>;
export declare class SessionStorageService {
    private serializeService;
    private sessionStorage;
    private prefix;
    private version;
    constructor(serializeService: SerializeService, injector: Injector);
    store(key: string, value: any): void;
    store(key: string, value: any, withVersion: boolean): void;
    restore(key: string): any;
    restore(key: string, withVersion: boolean): any;
    restoreRawData(key: string): string;
    restoreRawData(key: string, withVersion: boolean): string;
    remove(key: string): void;
    remove(key: string, withVersion: boolean): void;
    clear(): void;
    clear(matchKey: string): void;
    clear(matchKey: string, withVersion: boolean): void;
    clearByVersion(version: string): void;
    private keyPrefix(withVersion?);
    private createKey(key, withVersion?);
    private removeMatched(matchKey);
}
