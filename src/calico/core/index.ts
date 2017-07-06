import { NgModule, ModuleWithProviders } from "@angular/core";

import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";
import { SerializeService } from "./serialize.service";
import { Api, SubmittingPipe, RequestWatcher, REQUEST_HOOK, requestWatcherFactory } from "./api.service";
import { ExtEnumService } from "./ext-enum.service";
import { ExtEnumPipe } from "./ext-enum.pipe";
import { RemoteDataService, EnsureRemoteData } from "./remote-data.service";

@NgModule({
  imports: [
  ],
  declarations: [
    SubmittingPipe,
    ExtEnumPipe,
  ],
  exports: [
    SubmittingPipe,
    ExtEnumPipe,
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
        {provide: RequestWatcher, useFactory: requestWatcherFactory},
        {provide: REQUEST_HOOK, useExisting: RequestWatcher, multi: true},
        Api,
        ExtEnumService,
        RemoteDataService,
        EnsureRemoteData,
      ]
    };
  }
}

export { LocalStorageService, LocalStorageServiceConfig } from "./local-storage.service";
export { SessionStorageService, SessionStorageServiceConfig } from "./session-storage.service";
export { SerializeService } from "./serialize.service";
export { Api, MessageConfig, MESSAGE_CONFIG } from "./api.service";
export { ExtEnumService, ExtEnum, ExtEnumData, ExtEnumDataProvider, EXT_ENUM_DATA_PROVIDER } from "./ext-enum.service";
export { RemoteDataService, EnsureRemoteData, RemoteDataType, REMOTE_DATA_TYPE } from "./remote-data.service";
