import { Component } from "@angular/core";
import { SearchContext } from "./search.service";
var PagerComponent = /** @class */ (function () {
    function PagerComponent(searchContext) {
        this.searchContext = searchContext;
        this.perPageOptions = [
            { id: 10, name: '10件' },
            { id: 50, name: '50件' },
            { id: 100, name: '100件' },
        ];
        this.range = 3;
        this._subscriptions = [];
    }
    Object.defineProperty(PagerComponent.prototype, "subscription", {
        set: function (subription) {
            this._subscriptions.push(subription);
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initPageInfo();
        this.subscription = this.searchContext.searched.subscribe(function () {
            _this.initPageInfo();
        });
    };
    PagerComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._subscriptions = [];
    };
    PagerComponent.prototype.initPageInfo = function () {
        this._info = {
            recordCount: this.getRecordCount(),
            perPage: this.getPerPage(),
            currentPageNo: this.getCurrentPageNo(),
            minPageNo: this.getMinPageNo(),
            maxPageNo: this.getMaxPageNo(),
            hasPrevPage: this.getHasPrevPage(),
            hasNextPage: this.getHasNextPage(),
            pageNos: this.getPageNos(),
        };
    };
    PagerComponent.prototype.getRecordCount = function () {
        if (this.searchContext.result == null)
            return 0;
        return this.searchContext.result._count;
    };
    PagerComponent.prototype.getPerPage = function () {
        return this.searchContext.form.value._page.perPage;
    };
    PagerComponent.prototype.getCurrentPageNo = function () {
        return this.searchContext.form.value._page.no;
    };
    PagerComponent.prototype.getMinPageNo = function () {
        return 1;
    };
    PagerComponent.prototype.getMaxPageNo = function () {
        if (this.searchContext.result == null)
            return 1;
        return Math.floor(this.getRecordCount() / this.getPerPage())
            + (this.getRecordCount() % this.getPerPage() == 0 ? 0 : 1);
    };
    PagerComponent.prototype.getHasPrevPage = function () {
        return this.getCurrentPageNo() > this.getMinPageNo();
    };
    PagerComponent.prototype.getHasNextPage = function () {
        return this.getCurrentPageNo() < this.getMaxPageNo();
    };
    PagerComponent.prototype.getPageNos = function () {
        var currentPageNo = this.getCurrentPageNo();
        var minPageNo = this.getMinPageNo();
        var maxPageNo = this.getMaxPageNo();
        var ret = [];
        var i;
        for (i = currentPageNo - this.range; i <= currentPageNo + this.range; i++) {
            if (minPageNo <= i && i <= maxPageNo)
                ret.push(i);
        }
        if (ret.indexOf(minPageNo) === -1) {
            if (ret.first() >= 3) {
                ret.unshift(null);
            }
            ret.unshift(minPageNo);
        }
        if (ret.indexOf(maxPageNo) === -1) {
            if (ret.last() <= maxPageNo - 2) {
                ret.push(null);
            }
            if (maxPageNo > minPageNo) {
                ret.push(maxPageNo);
            }
        }
        return ret;
    };
    PagerComponent.prototype.onChangePerPage = function () {
        this.searchContext.onPerPageChange(this._info.perPage);
    };
    PagerComponent.prototype.moveTo = function (no) {
        this.searchContext.onPageNoChange(no);
    };
    PagerComponent.prototype.moveToPrev = function () {
        if (!this._info.hasPrevPage)
            return;
        this.searchContext.onPageNoChange(this._info.currentPageNo - 1);
    };
    PagerComponent.prototype.moveToNext = function () {
        if (!this._info.hasNextPage)
            return;
        this.searchContext.onPageNoChange(this._info.currentPageNo + 1);
    };
    PagerComponent.decorators = [
        { type: Component, args: [{
                    selector: '[cPager]',
                    template: "\n    <span class=\"c-pager\">\n      <span class=\"record-count\">\n        \u691C\u7D22\u7D50\u679C<span>{{_info.recordCount}}</span>\u4EF6\n      </span>\n      <c-select [(ngModel)]=\"_info.perPage\"\n                [options]=\"perPageOptions\"\n                optionValue=\"id\"\n                [nullOption]=\"false\"\n                (change)=\"onChangePerPage()\"></c-select>\n      <ul class=\"pagination  pagination-sm\">\n        <li [class.disabled]=\"!_info.hasPrevPage\">\n          <a (click)=\"moveToPrev()\" aria-label=\"Previous\"><span>&laquo;</span></a>\n        </li>\n        <li *ngFor=\"let no of _info.pageNos\"\n            [class.active]=\"_info.currentPageNo == no\"\n            [class.ellipsis]=\"no == null\">\n          <a *ngIf=\"no != null; else noPage\" (click)=\"moveTo(no)\">{{no}}</a>\n          <ng-template #noPage><a>...</a></ng-template>\n        </li>\n        <li [class.disabled]=\"!_info.hasNextPage\">\n          <a (click)=\"moveToNext()\" aria-label=\"Next\"><span>&raquo;</span></a>\n        </li>\n      </ul>\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    PagerComponent.ctorParameters = function () { return [
        { type: SearchContext }
    ]; };
    return PagerComponent;
}());
export { PagerComponent };
//# sourceMappingURL=pager.component.js.map