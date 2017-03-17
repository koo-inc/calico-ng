import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InfoTableDirective, ListTableDirective, } from './table.directive';
import { ButtonDirective } from "./button.directive";
import { GlyphiconDirective } from "./glyphicon.directive";
import { PanelComponent, PanelHeaderComponent, PanelFooterComponent } from "./panel.component";
import { ColsComponent } from "./cols.component";
import { AlertComponent, AlertService } from "./alert.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    PanelComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    ColsComponent,
    AlertComponent,
  ],
  exports: [
    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    PanelComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    ColsComponent,
    AlertComponent,
  ]
})
export class CalicoUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalicoUiModule,
      providers: [
        AlertService,
      ]
    };
  }
}

export { AlertService, AlertConfig, AlertOptions, AlertMessage } from "./alert.service";
