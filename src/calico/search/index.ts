import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CalicoFormModule } from "../form/index";

import { SortComponent } from "./sort.component";
import { PagerComponent } from "./pager.component";
import { SearchService } from "./search.service";

@NgModule({
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
})
export class CalicoSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalicoSearchModule,
      providers: [
        SearchService,
      ]
    };
  }
}

export { SearchService, SearchContext, SearchContextConfig } from './search.service';
