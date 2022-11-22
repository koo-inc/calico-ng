import { Injector, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
export declare const ALERT_CONFIG: InjectionToken<AlertConfig>;
export interface AlertOptions {
    position?: string;
    lifetime?: number;
}
export interface AlertConfig {
    common?: AlertOptions;
    success?: AlertOptions;
    info?: AlertOptions;
    warning?: AlertOptions;
    danger?: AlertOptions;
    removeTypesOnNavigationStart?: string[];
    removeTypesOnSubmitForm?: string[];
}
export interface AlertMessage {
    type: string;
    title: string;
    messages: string[];
    position: string;
    lifetime: number;
    key: string;
    state: string;
}
export declare class AlertService {
    private injector;
    private router;
    constructor(injector: Injector, router: Router);
    config: AlertConfig;
    messages: {
        [key: string]: AlertMessage[];
    };
    success(title: string, messages?: string[], opts?: AlertOptions): void;
    info(title: string, messages?: string[], opts?: AlertOptions): void;
    warning(title: string, messages?: string[], opts?: AlertOptions): void;
    danger(title: string, messages?: string[], opts?: AlertOptions): void;
    removeByType(...types: string[]): void;
    onSubmitForm(): void;
    private createMessage(type, title, messages, opts?);
    private normalizePosition(position);
    private addMessage(message);
    removeMessage(message: any): void;
}
export declare class AlertComponent {
    private alertService;
    constructor(alertService: AlertService);
    identify(index: number, message: any): any;
    readonly messages: {
        [key: string]: AlertMessage[];
    };
    removeMessage(message: any): void;
}
