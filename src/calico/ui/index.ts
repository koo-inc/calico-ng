import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ng2-bootstrap";

import { InfoTableDirective, ListTableDirective, } from './table.directive';
import { ButtonDirective } from "./button.directive";
import { GlyphiconDirective } from "./glyphicon.directive";
import { PanelComponent, PanelHeaderComponent, PanelFooterComponent } from "./panel.component";
import { ModalComponent, ModalHeaderComponent, ModalFooterComponent } from "./modal.component";
import { ColsComponent } from "./cols.component";
import { AlertComponent, AlertService } from "./alert.service";
import { PopoverComponent } from "./popover.component";

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
    PanelComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    PopoverComponent,
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
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    PopoverComponent,
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
export { PopoverComponent } from "./popover.component";
