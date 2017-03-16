import { NgModule, ModuleWithProviders } from "@angular/core";

import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";
import { SerializeService } from "./serialize.service";
import { Api } from "./api.service";
import { ExtEnumService } from "./ext-enum.service";

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CalicoCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalicoCoreModule,
      providers: [
        LocalStorageService,
        SessionStorageService,
        SerializeService,
        Api,
        ExtEnumService,
      ]
    };
  }
}

export { LocalStorageService, LocalStorageServiceConfig } from "./local-storage.service";
export { SessionStorageService, SessionStorageServiceConfig } from "./session-storage.service";
export { SerializeService } from "./serialize.service";
export { Api, MessageConfig, MESSAGE_CONFIG } from "./api.service";
export { ExtEnumService, ExtEnumServiceConfig, ExtEnum, ExtEnumData } from "./ext-enum.service";
