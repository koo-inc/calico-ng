import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CalicoFormModule } from "../form/index";
import { SortComponent } from "./sort.component";
import { PagerComponent } from "./pager.component";
import { SearchService, SearchFormBuilder } from "./search.service";
var CalicoSearchModule = /** @class */ (function () {
    function CalicoSearchModule() {
    }
    CalicoSearchModule.forRoot = function () {
        return {
            ngModule: CalicoSearchModule,
            providers: [
                SearchService,
                SearchFormBuilder,
            ]
        };
    };
    CalicoSearchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CalicoFormModule,
                    ],
                    declarations: [
                        SortComponent,
                        PagerComponent,
                    ],
                    exports: [
                        SortComponent,
                        PagerComponent,
                    ]
                },] },
    ];
    return CalicoSearchModule;
}());
export { CalicoSearchModule };
export { SearchService, SearchFormBuilder, SearchContext } from './search.service';
//# sourceMappingURL=index.js.map