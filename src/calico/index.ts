import './extension';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ErrorTipComponent } from "./form/errortip.component";
import { TextFieldComponent } from "./form/textfield.component";
import { PasswordComponent } from "./form/password.component";
import { SelectComponent } from "./form/select.component";
import { RadiosComponent } from "./form/radios.component";
import { CheckboxComponent } from "./form/checkbox.component";
import { CheckboxesComponent } from "./form/checkboxes.component";
import { DatepickerComponent } from "./form/datepicker.component";
import { TimepickerComponent } from "./form/timepicker.component";

import {
  InfoTableDirective,
  ListTableDirective,
} from './bootstrap/table.directive';
import { ButtonDirective } from "./bootstrap/button.directive";
import { GlyphiconDirective } from "./bootstrap/glyphicon.directive";
import { PanelComponent } from "./bootstrap/panel.component";
import { ColsComponent } from "./bootstrap/cols.component";
import { AlertComponent } from "./bootstrap/alert.service";

import { LocalStorageService } from "./util/local-storage.service";
import { SessionStorageService } from "./util/session-storage.service";
import { SerializeService } from "./util/serialize.service";
import { Api } from "./util/api.service";

import { SortComponent } from "./search/sort.component";
import { PagerComponent } from "./search/pager.component";

export { AlertService } from "./bootstrap/alert.service";

export { LocalStorageService, LocalStorageServiceConfig } from "./util/local-storage.service";
export { SessionStorageService, SessionStorageServiceConfig } from "./util/session-storage.service";
export { SerializeService } from "./util/serialize.service";
export { Api } from "./util/api.service";

export { SearchService, SearchContext } from "./search/search.service";

import { ModalModule, PopoverModule, DatepickerModule, TimepickerModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,
    DatepickerModule,
    TimepickerModule,
  ],
  declarations: [
    ErrorTipComponent,
    TextFieldComponent,
    PasswordComponent,
    SelectComponent,
    RadiosComponent,
    CheckboxComponent,
    CheckboxesComponent,
    DatepickerComponent,
    TimepickerComponent,

    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    PanelComponent,
    ColsComponent,
    AlertComponent,

    SortComponent,
    PagerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorTipComponent,
    TextFieldComponent,
    PasswordComponent,
    SelectComponent,
    RadiosComponent,
    CheckboxComponent,
    CheckboxesComponent,
    DatepickerComponent,
    TimepickerComponent,

    InfoTableDirective,
    ListTableDirective,
    ButtonDirective,
    GlyphiconDirective,
    PanelComponent,
    ColsComponent,
    AlertComponent,

    SortComponent,
    PagerComponent,
  ],
  providers: [
    LocalStorageService,
    SessionStorageService,
    SerializeService,
    Api
  ]
})
export class CalicoModule { }
