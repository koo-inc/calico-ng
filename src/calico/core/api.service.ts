import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

import { Injectable, Inject, Pipe, PipeTransform, Optional, InjectionToken } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { AlertService } from "../ui/alert.service";

export class MessageConfig {
  [id: string]: string
}
export const MESSAGE_CONFIG = new InjectionToken<MessageConfig>('MessageConfig');

export interface RequestHook {
  apply(url: string, form: any, observable: Observable<HttpResponse<any>>): Observable<HttpResponse<any>>;
}
export const REQUEST_HOOK = new InjectionToken<RequestHook>('RequestHook');

@Injectable()
export class Api {
  private headers: {name: string, value: string}[] = [];

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    @Inject(MESSAGE_CONFIG) private messages: MessageConfig,
    @Optional() @Inject(REQUEST_HOOK) private requestHooks: RequestHook[]
  ) {
    this.requestHooks = this.requestHooks || [];
  }

  header(name: string, value: string): Api {
    let api = new Api(this.http, this.alert, this.messages, this.requestHooks);
    api.headers = this.headers.clone().add({name: name, value: value});
    return api;
  }

  submit<T> (url: string): Observable<T>;
  submit<T> (url: string, form: AbstractControl): Observable<T>;
  submit<T> (url: string, form: any): Observable<T>;
  submit<T> (url: string, form?: any): Observable<T> {
    if(form instanceof AbstractControl){
      this.alert.onSubmitForm();
    }
    form = form instanceof AbstractControl ? form : {value: form, invalid: false, get: (key: string): any => null};

    if(form.invalid){
      this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。', null, {lifetime: 3000});
      return empty();
    }

    let headers = this.headers.reduce((headers, h) => {
      headers[h.name] = h.value;
      return headers;
    }, {'Content-Type': 'application/json'});

    let observable = this.http.post(url, form.value, {headers: new HttpHeaders(headers), observe: 'response'});

    observable = this.requestHooks.reduce((o: Observable<HttpResponse<{}>>, hook) => hook.apply(url, form, o), observable);

    let catcher = tap(null, (e: any): Observable<T> => {
      if (e == null || e.error == null || !this.isErrorObject(e.error)) {
        console.error(e);
        this.alert.danger(this.messages['internalServerError'] || '500 Internal Server Error');
        throw e;
      }

      let errors = e.error;
      let alertMessages: string[] = [];
      Object.keys(errors).forEach((key: string) => {
        let violation = errors[key].reduce((a:any, b:string) => {a[b] = true; return a}, {});
        let ctrl = form.get(key);
        if (ctrl != null) {
          ctrl.setErrors(violation);
        } else {
          errors[key]
            .map((msg: string) => this.messages[msg] || msg )
            .forEach((msg: string) => alertMessages.push(msg));
        }
      });
      if(alertMessages.isEmpty()){
        this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。', null, {lifetime: 3000});
      }else{
        this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。', alertMessages);
      }
      throw e;
    });

    return catcher(observable.pipe(map((req: HttpResponse<T>, _: any) => req.body))) as Observable<T>;
  }

  private isErrorObject(error: any) {
    try {
      let keys = Object.keys(error);
      for (let key of keys) {
        if (!(error[key] instanceof Array)) {
          return false;
        }
      }
      return true;
    }
    catch (e) {
      return false;
    }
  }
}

// TODO: use Interceptor
@Injectable()
export class RequestWatcher implements RequestHook {
  private pendingForms: any[];

  constructor() {
    this.pendingForms = [];
  }
  apply(url: string, form: any, observable: Observable<HttpResponse<any>>): Observable<HttpResponse<any>> {
    this.pendingForms.push(form);
    return tap(
      (o: any) => this.pendingForms.remove(form),
      (e: any) => this.pendingForms.remove(form)
    )(observable);
  }

  isSubmitting(form: any): boolean {
    return this.pendingForms.indexOf(form) > -1;
  }
}

export const REQUEST_WATCHER = new RequestWatcher();
export function requestWatcherFactory() {
  return REQUEST_WATCHER;
}

@Pipe({ name: 'submitting', pure: false })
export class SubmittingPipe implements PipeTransform {
  constructor(
    private watcher: RequestWatcher,
  ) {}

  transform(value: any, ...args: any[]): any {
    return this.watcher.isSubmitting(value);
  }

}
