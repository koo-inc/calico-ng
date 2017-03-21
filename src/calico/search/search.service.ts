import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { SerializeService } from "../core";
import { SessionStorageService } from "../core";

@Injectable()
export class SearchService {

  constructor(
    private sessionStorageService: SessionStorageService,
    private serializeService: SerializeService,
  ) {}

  storeFormValue(key: string, value: any): void {
    this.sessionStorageService.store(this.createKey(key), value);
  }

  clearFormValue(key: string): void {
    this.sessionStorageService.remove(this.createKey(key));
  }

  restoreFormValue(key: string): any {
    return this.sessionStorageService.restore(this.createKey(key));
  }

  restoreAsFragment(key: string): string {
    let formValue = this.restoreFormValue(key);
    if(formValue == null) return null;
    return this.serializeService.serialize(formValue);
  }

  private createKey(key: string): string {
    return 'search-form-' + key;
  }

}

@Injectable()
export class SearchFormBuilder {

  constructor(
    private fb: FormBuilder,
  ) {}

  rootGroup(data: any, controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; }): FormGroup {
    if(data._page != null){
      controlsConfig['_page'] = this.fb.group({
        no: [data._page.no],
        perPage: [data._page.perPage],
      });
    }
    if(data._sort != null){
      controlsConfig['_sort'] = this.fb.group({
        prop: [data._sort.prop],
        type: [data._sort.type],
      });
    }
    return this.fb.group(controlsConfig, extra);
  }
}

@Injectable()
export class SearchContext {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serializeService: SerializeService,
    private searchService: SearchService,
  ) {}

  public config: SearchContextConfig;
  public form: FormGroup;
  public result: any;

  public searched: EventEmitter<any> = new EventEmitter();

  private lastFragment: string;
  private lastFormValue: any;

  _subscriptions: Subscription[] = [];
  set subscription(subription: Subscription) {
    this._subscriptions.push(subription);
  }

  init(config: SearchContextConfig): void {
    if(config.initialSearch == null){
      config.initialSearch = false;
    }
    this.config = config;

    this.subscription = this.route.fragment.subscribe(fragment => {
      this.lastFragment = fragment;
      if(fragment == null){
        this.config.getForm()
          .subscribe(form => {
            this.form = form;
            if(this.config.initialSearch){
              this.executeSearch();
            }else{
              this.result = null;
            }
          });
      }else{
        this.form = this.config.toForm(this.serializeService.deserialize(fragment));
        this.executeSearch();
      }
    });
  }

  onDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  search(): void {
    let fragment = this.serializeService.serialize(this.form.value);
    if(fragment == this.lastFragment){
      this.executeSearch();
    }else{
      this.router.navigate([], {fragment: fragment});
    }
  }

  private executeSearch(): void {
    let formValue = Object.clone(this.form.value, true);
    this.config.search().subscribe(data => {
      this.result = data;
      this.searched.emit(data);
      this.lastFormValue = formValue;
      if(this.lastFragment == null){
        this.searchService.clearFormValue(this.getKey());
      }else{
        this.searchService.storeFormValue(this.getKey(), formValue);
      }
    });
  }

  onPageNoChange(no: number): void {
    let form = this.config.toForm(this.lastFormValue);
    let noControl: AbstractControl = form.get('_page.no');
    noControl.setValue(no);
    this.form = form;
    this.search();
  }

  onPerPageChange(perPage: number): void {
    let form = this.config.toForm(this.lastFormValue);
    let noControl: AbstractControl = form.get('_page.no');
    let perPageControl: AbstractControl = form.get('_page.perPage');
    noControl.setValue(1);
    perPageControl.setValue(perPage);
    this.form = form;
    this.search();
  }

  onSortChange(prop: string): void {
    let form = this.config.toForm(this.lastFormValue);
    let propControl: AbstractControl = form.get('_sort.prop');
    let typeControl: AbstractControl = form.get('_sort.type');
    let noControl: AbstractControl = form.get('_page.no');
    if(propControl.value == prop){
      typeControl.setValue(typeControl.value == 'DESC' ? 'ASC' : 'DESC');
    }else{
      propControl.setValue(prop);
      typeControl.setValue('ASC');
    }
    if(noControl != null){
      noControl.setValue(1);
    }
    this.form = form;
    this.search();
  }

  private getKey(): string {
    return this.route.pathFromRoot
      .map((r: any) => r.url.value)
      .flatten()
      .map((v: any) => v.path)
      .filter((v: any) => v != null && v != '')
      .join('/');
  }

}

export interface SearchContextConfig {
  search: () => Observable<any>;
  getForm: () => Observable<any>;
  toForm:(form: any) => FormGroup;
  initialSearch?: boolean;
}
