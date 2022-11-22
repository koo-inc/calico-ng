import { ModuleWithProviders } from "@angular/core";
export declare class CalicoCoreModule {
    static forRoot(): ModuleWithProviders;
}
export { LocalStorageService, LocalStorageServiceConfig } from "./local-storage.service";
export { SessionStorageService, SessionStorageServiceConfig } from "./session-storage.service";
export { SerializeService } from "./serialize.service";
export { Api, MessageConfig, MESSAGE_CONFIG } from "./api.service";
export { ExtEnumService, ExtEnum, ExtEnumData, ExtEnumDataProvider, EXT_ENUM_DATA_PROVIDER } from "./ext-enum.service";
export { RemoteDataService, EnsureRemoteData, RemoteDataType, REMOTE_DATA_TYPE } from "./remote-data.service";
