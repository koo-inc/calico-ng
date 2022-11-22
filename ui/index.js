import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { InfoTableDirective, ListTableDirective, } from './table.directive';
import { ButtonDirective } from "./button.directive";
import { GlyphiconDirective } from "./glyphicon.directive";
import { FontAwesomeDirective } from "./font-awesome.directive";
import { PanelComponent, PanelHeaderComponent, PanelFooterComponent } from "./panel.component";
import { ModalComponent, ModalHeaderComponent, ModalFooterComponent } from "./modal.component";
import { ColsComponent } from "./cols.component";
import { AlertComponent, AlertService } from "./alert.service";
import { PopoverDirective } from "./popover.directive";
import { DownloadDirective } from "./download.directive";
var CalicoUiModule = /** @class */ (function () {
    function CalicoUiModule() {
    }
    CalicoUiModule.forRoot = function () {
        return {
            ngModule: CalicoUiModule,
            providers: [
                AlertService,
            ]
        };
    };
    CalicoUiModule.decorators = [
        { type: NgModule, args: [{
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
                        DownloadDirective,
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
                        DownloadDirective,
                    ]
                },] },
    ];
    return CalicoUiModule;
}());
export { CalicoUiModule };
export { AlertService } from "./alert.service";
export { ModalComponent } from "./modal.component";
export { PopoverDirective } from "./popover.directive";
//# sourceMappingURL=index.js.map