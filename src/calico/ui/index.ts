import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap";

import { InfoTableDirective, ListTableDirective, } from './table.directive';
import { ButtonDirective } from "./button.directive";
import { GlyphiconDirective } from "./glyphicon.directive";
import { FontAwesomeDirective } from "./font-awesome.directive";
import { PanelComponent, PanelHeaderComponent, PanelFooterComponent } from "./panel.component";
import { ModalComponent, ModalHeaderComponent, ModalFooterComponent } from "./modal.component";
import { ColsComponent } from "./cols.component";
import { AlertComponent, AlertService } from "./alert.service";
import { PopoverDirective } from "./popover.directive";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    FontAwesomeDirective,
    PanelComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    PopoverDirective,
    ColsComponent,
    AlertComponent,
  ],
  exports: [
    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    FontAwesomeDirective,
    PanelComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    PopoverDirective,
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
export { ModalComponent } from "./modal.component";
export { PopoverDirective } from "./popover.directive";
