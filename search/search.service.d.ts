import { EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { SerializeService } from "../core";
import { SessionStorageService } from "../core";
export declare class SearchService {
    private sessionStorageService;
    private serializeService;
    constructor(sessionStorageService: SessionStorageService, serializeService: SerializeService);
    storeFormValue(key: string, value: any): void;
    clearFormValue(key: string): void;
    restoreFormValue(key: string): any;
    restoreAsFragment(key: string): string;
    private createKey(key);
}
export declare class SearchFormBuilder {
    private fb;
    constructor(fb: FormBuilder);
    rootGroup(data: any, controlsConfig: {
        [key: string]: any;
    }, extra?: {
        [key: string]: any;
    }): FormGroup;
}
export declare class SearchContext {
    private route;
    private router;
    private serializeService;
    private searchService;
    constructor(route: ActivatedRoute, router: Router, serializeService: SerializeService, searchService: SearchService);
    config: SearchContextConfig;
    form: FormGroup;
    result: any;
    searched: EventEmitter<any>;
    private lastFragment;
    private lastFormValue;
    _subscriptions: Subscription[];
    subscription: Subscription;
    init(config: SearchContextConfig): void;
    onDestroy(): void;
    search(): void;
    private executeSearch();
    onPageNoChange(no: number): void;
    onPerPageChange(perPage: number): void;
    onSortChange(prop: string): void;
    getKey(): string;
}
export interface SearchContextConfig {
    search: () => Observable<any>;
    getForm: () => Observable<FormGroup>;
    toForm: (formValue: any) => FormGroup;
    initialSearch?: boolean;
}
