import { Observable } from "rxjs";
import 'rxjs/add/operator/map'

import { Injectable, Inject, OpaqueToken, Pipe, PipeTransform } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Http, Headers, RequestOptions } from "@angular/http";

import { AlertService } from "../ui/alert.service";

export class MessageConfig {
  [id: string]: string
}

export const MESSAGE_CONFIG = new OpaqueToken('MessageConfig');

@Injectable()
export class Api {
  constructor(private http: Http, private alert: AlertService, @Inject(MESSAGE_CONFIG) private messages: MessageConfig) { }

  submit<T> (url: string): Observable<T>;
  submit<T> (url: string, form: AbstractControl): Observable<T>;
  submit<T> (url: string, form: any): Observable<T>;
  submit<T> (url: string, form?: any): Observable<T> {
    if(form instanceof AbstractControl && form.invalid){
      this.alert.warning(this.messages['invalidForm'] || '入力値に問題があります。');
      return Observable.empty();
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    form = form instanceof AbstractControl ? form : {value: form, get: (key: string): any => null};

    this.submittingForms.push(form);
    return this.http.post(url, JSON.stringify(form.value), options)
      .map((req, _) => req.json() as T)
      .do(() => { this.submittingForms.remove((f: AbstractControl) => f === form); })
      .catch((e: any, caught: Observable<any>): Observable<any> => {
        this.submittingForms.remove((f: AbstractControl) => f === form);
        let errors: any;
        try {
          errors = e.json();
        } catch (e) {
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

  private submittingForms: AbstractControl[] = [];

  isSubmitting(form: AbstractControl): boolean {
    return this.submittingForms.indexOf(form) != -1;
  }
}

@Pipe({ name: 'submitting', pure: false })
export class SubmittingPipe implements PipeTransform {
  constructor(
    private api: Api,
  ) {}

  transform(value: any, ...args: any[]): any {
    return this.api.isSubmitting(value);
  }

}
