import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

import { ErrorTipComponent } from "./errortip.component";
import { TextFieldComponent } from "./textfield.component";
import { PasswordComponent } from "./password.component";
import { SelectComponent } from "./select.component";
import { RadiosComponent } from "./radios.component";
import { CheckboxComponent } from "./checkbox.component";
import { CheckboxesComponent } from "./checkboxes.component";
import { DatepickerComponent } from "./datepicker.component";
import { TimepickerComponent } from "./timepicker.component";
import { TextareaComponent } from "./textarea.component";
import { IntegerComponent } from "./integer.component";
import { CurrencyComponent } from "./currency.component";
import { FloatComponent } from "./float.component";
import { FileComponent } from "./file.component";
import { ErrorTipContainerComponent } from "./errortip-container.component";
import { CalicoUiModule } from "../ui";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,
    DatepickerModule,
    TimepickerModule,
    CalicoUiModule,
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
    TextareaComponent,
    IntegerComponent,
    CurrencyComponent,
    FloatComponent,
    FileComponent,
    ErrorTipContainerComponent,
  ],
  exports: [
    ErrorTipComponent,
    TextFieldComponent,
    PasswordComponent,
    SelectComponent,
    RadiosComponent,
    CheckboxComponent,
    CheckboxesComponent,
    DatepickerComponent,
    TimepickerComponent,
    TextareaComponent,
    IntegerComponent,
    CurrencyComponent,
    FloatComponent,
    FileComponent,
    ErrorTipContainerComponent,
  ]
})
export class CalicoFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalicoFormModule,
      providers: []
    };
  }
}

