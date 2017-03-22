import { Observable } from "rxjs";
import 'rxjs/add/operator/map'

import { Injectable, Inject, OpaqueToken, Pipe, PipeTransform, Optional } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Http, Headers, RequestOptions } from "@angular/http";

import { AlertService } from "../ui/alert.service";

export class MessageConfig {
  [id: string]: string
}
export const MESSAGE_CONFIG = new OpaqueToken('MessageConfig');

export interface RequestHook {
  apply<T>(form: any, observable: Observable<T>): Observable<T>;
}
export const REQUEST_HOOK = new OpaqueToken('RequestHook');

@Injectable()
export class Api {
  constructor(
    private http: Http,
    private alert: AlertService,
    @Inject(MESSAGE_CONFIG) private messages: MessageConfig,
    @Optional() @Inject(REQUEST_HOOK) private requestHooks: RequestHook[]
  ) {
    this.requestHooks = this.requestHooks || [];
  }

  submit<T> (url: string): Observable<T>;
  submit<T> (url: string, form: AbstractControl): Observable<T>;
  submit<T> (url: string, form: any): Observable<T>;
  submit<T> (url: string, form?: any): Observable<T> {
    form = form instanceof AbstractControl ? form : {value: form, invalid: false, get: (key: string): any => null};

    if(form.invalid){
      this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。');
      return Observable.empty();
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    let observable = this.http.post(url, JSON.stringify(form.value), options)
      .map((req, _) => req.json() as T);

    return this.requestHooks.reduce((o, hook) => hook.apply(form, o), observable)
      .catch((e: any, caught: Observable<any>): Observable<any> => {
        let errors: any;
        try {
          errors = e.json();
        } catch (e2) {
          console.error(e);
          this.alert.warning(this.messages['internalServerError'] || '500 Internal Server Error');
          throw e;
        }
        Object.keys(errors).forEach(key => {
          let violation = errors[key].reduce((a:any, b:string) => {a[b] = true; return a}, {});
          let ctrl = form.get(key);
          if (ctrl != null) {
            ctrl.setErrors(violation);
          } else {
            let message = errors[key].map((msg: string) => this.messages[msg] || msg ).join('\n');
            this.alert.warning(message);
          }
        });
        throw e;
      });
  }
}

@Injectable()
export class RequestWatcher implements RequestHook {
  private pendingForms: any[];

  constructor() {
    this.pendingForms = [];
  }
  apply<T>(form: any, observable: Observable<T>): Observable<T> {
    this.pendingForms.push(form);
    return observable.do(
      o => this.pendingForms.remove(form),
      e => this.pendingForms.remove(form)
    );
  }

  isSubmitting(form: any): boolean {
    return this.pendingForms.indexOf(form) > -1;
  }
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
