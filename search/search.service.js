import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { SerializeService } from "../core";
import { SessionStorageService } from "../core";
var SearchService = /** @class */ (function () {
    function SearchService(sessionStorageService, serializeService) {
        this.sessionStorageService = sessionStorageService;
        this.serializeService = serializeService;
    }
    SearchService.prototype.storeFormValue = function (key, value) {
        this.sessionStorageService.store(this.createKey(key), value);
    };
    SearchService.prototype.clearFormValue = function (key) {
        this.sessionStorageService.remove(this.createKey(key));
    };
    SearchService.prototype.restoreFormValue = function (key) {
        return this.sessionStorageService.restore(this.createKey(key));
    };
    SearchService.prototype.restoreAsFragment = function (key) {
        var formValue = this.restoreFormValue(key);
        if (formValue == null)
            return null;
        return this.serializeService.serialize(formValue);
    };
    SearchService.prototype.createKey = function (key) {
        return 'search-form-' + key;
    };
    SearchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchService.ctorParameters = function () { return [
        { type: SessionStorageService },
        { type: SerializeService }
    ]; };
    return SearchService;
}());
export { SearchService };
var SearchFormBuilder = /** @class */ (function () {
    function SearchFormBuilder(fb) {
        this.fb = fb;
    }
    SearchFormBuilder.prototype.rootGroup = function (data, controlsConfig, extra) {
        if (data._page != null) {
            controlsConfig['_page'] = this.fb.group({
                no: [data._page.no],
                perPage: [data._page.perPage],
            });
        }
        if (data._sort != null) {
            controlsConfig['_sort'] = this.fb.group({
                prop: [data._sort.prop],
                type: [data._sort.type],
            });
        }
        return this.fb.group(controlsConfig, extra);
    };
    SearchFormBuilder.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchFormBuilder.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    return SearchFormBuilder;
}());
export { SearchFormBuilder };
var SearchContext = /** @class */ (function () {
    function SearchContext(route, router, serializeService, searchService) {
        this.route = route;
        this.router = router;
        this.serializeService = serializeService;
        this.searchService = searchService;
        this.searched = new EventEmitter();
        this._subscriptions = [];
    }
    Object.defineProperty(SearchContext.prototype, "subscription", {
        set: function (subription) {
            this._subscriptions.push(subription);
        },
        enumerable: true,
        configurable: true
    });
    SearchContext.prototype.init = function (config) {
        var _this = this;
        if (config.initialSearch == null) {
            config.initialSearch = false;
        }
        this.config = config;
        this.subscription = this.route.fragment.subscribe(function (fragment) {
            _this.lastFragment = fragment;
            if (fragment == null) {
                _this.config.getForm()
                    .subscribe(function (form) {
                    _this.form = form;
                    if (_this.config.initialSearch) {
                        _this.executeSearch();
                    }
                    else {
                        _this.result = null;
                    }
                });
            }
            else {
                _this.form = _this.config.toForm(_this.serializeService.deserialize(fragment));
                _this.executeSearch();
            }
        });
    };
    SearchContext.prototype.onDestroy = function () {
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._subscriptions = [];
    };
    SearchContext.prototype.search = function () {
        var fragment = this.serializeService.serialize(this.form.value);
        if (fragment == this.lastFragment) {
            this.executeSearch();
        }
        else {
            this.router.navigate([], { fragment: fragment });
        }
    };
    SearchContext.prototype.executeSearch = function () {
        var _this = this;
        var formValue = Object.clone(this.form.value, true);
        this.config.search().subscribe(function (data) {
            _this.result = data;
            _this.searched.emit(data);
            _this.lastFormValue = formValue;
            if (_this.lastFragment == null) {
                _this.searchService.clearFormValue(_this.getKey());
            }
            else {
                _this.searchService.storeFormValue(_this.getKey(), formValue);
            }
        });
    };
    SearchContext.prototype.onPageNoChange = function (no) {
        var form = this.config.toForm(this.lastFormValue);
        var noControl = form.get('_page.no');
        noControl.setValue(no);
        this.form = form;
        this.search();
    };
    SearchContext.prototype.onPerPageChange = function (perPage) {
        var form = this.config.toForm(this.lastFormValue);
        var noControl = form.get('_page.no');
        var perPageControl = form.get('_page.perPage');
        noControl.setValue(1);
        perPageControl.setValue(perPage);
        this.form = form;
        this.search();
    };
    SearchContext.prototype.onSortChange = function (prop) {
        var form = this.config.toForm(this.lastFormValue);
        var propControl = form.get('_sort.prop');
        var typeControl = form.get('_sort.type');
        var noControl = form.get('_page.no');
        if (propControl.value == prop) {
            typeControl.setValue(typeControl.value == 'DESC' ? 'ASC' : 'DESC');
        }
        else {
            propControl.setValue(prop);
            typeControl.setValue('ASC');
        }
        if (noControl != null) {
            noControl.setValue(1);
        }
        this.form = form;
        this.search();
    };
    SearchContext.prototype.getKey = function () {
        return this.route.pathFromRoot
            .map(function (r) { return r.url.value; })
            .flatten()
            .map(function (v) { return v.path; })
            .filter(function (v) { return v != null && v != ''; })
            .join('/');
    };
    SearchContext.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchContext.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router },
        { type: SerializeService },
        { type: SearchService }
    ]; };
    return SearchContext;
}());
export { SearchContext };
//# sourceMappingURL=search.service.js.map