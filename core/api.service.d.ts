import { Observable } from "rxjs";
import { PipeTransform, InjectionToken } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AlertService } from "../ui/alert.service";
export declare class MessageConfig {
    [id: string]: string;
}
export declare const MESSAGE_CONFIG: InjectionToken<MessageConfig>;
export interface RequestHook {
    apply(url: string, form: any, observable: Observable<HttpResponse<any>>): Observable<HttpResponse<any>>;
}
export declare const REQUEST_HOOK: InjectionToken<RequestHook>;
export declare class Api {
    private http;
    private alert;
    private messages;
    private requestHooks;
    private headers;
    constructor(http: HttpClient, alert: AlertService, messages: MessageConfig, requestHooks: RequestHook[]);
    header(name: string, value: string): Api;
    submit<T>(url: string): Observable<T>;
    submit<T>(url: string, form: AbstractControl): Observable<T>;
    submit<T>(url: string, form: any): Observable<T>;
    private isErrorObject(error);
}
export declare class RequestWatcher implements RequestHook {
    private pendingForms;
    constructor();
    apply(url: string, form: any, observable: Observable<HttpResponse<any>>): Observable<HttpResponse<any>>;
    isSubmitting(form: any): boolean;
}
export declare const REQUEST_WATCHER: RequestWatcher;
export declare function requestWatcherFactory(): RequestWatcher;
export declare class SubmittingPipe implements PipeTransform {
    private watcher;
    constructor(watcher: RequestWatcher);
    transform(value: any, ...args: any[]): any;
}
