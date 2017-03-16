import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatepickerModule, PopoverModule, TimepickerModule } from "ng2-bootstrap";

import { ErrorTipComponent } from "./errortip.component";
import { TextFieldComponent } from "./textfield.component";
import { PasswordComponent } from "./password.component";
import { SelectComponent } from "./select.component";
import { RadiosComponent } from "./radios.component";
import { CheckboxComponent } from "./checkbox.component";
import { CheckboxesComponent } from "./checkboxes.component";
import { DatepickerComponent } from "./datepicker.component";
import { TimepickerComponent } from "./timepicker.component";

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
