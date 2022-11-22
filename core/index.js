import { NgModule } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";
import { SerializeService } from "./serialize.service";
import { Api, SubmittingPipe, RequestWatcher, REQUEST_HOOK, requestWatcherFactory } from "./api.service";
import { ExtEnumService } from "./ext-enum.service";
import { ExtEnumPipe } from "./ext-enum.pipe";
import { RemoteDataService, EnsureRemoteData } from "./remote-data.service";
var CalicoCoreModule = /** @class */ (function () {
    function CalicoCoreModule() {
    }
    CalicoCoreModule.forRoot = function () {
        return {
            ngModule: CalicoCoreModule,
            providers: [
                LocalStorageService,
                SessionStorageService,
                SerializeService,
                { provide: RequestWatcher, useFactory: requestWatcherFactory },
                { provide: REQUEST_HOOK, useExisting: RequestWatcher, multi: true },
                Api,
                ExtEnumService,
                RemoteDataService,
                EnsureRemoteData,
            ]
        };
    };
    CalicoCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        SubmittingPipe,
                        ExtEnumPipe,
                    ],
                    exports: [
                        SubmittingPipe,
                        ExtEnumPipe,
                    ]
                },] },
    ];
    return CalicoCoreModule;
}());
export { CalicoCoreModule };
export { LocalStorageService } from "./local-storage.service";
export { SessionStorageService } from "./session-storage.service";
export { SerializeService } from "./serialize.service";
export { Api, MessageConfig, MESSAGE_CONFIG } from "./api.service";
export { ExtEnumService, ExtEnum, ExtEnumData, EXT_ENUM_DATA_PROVIDER } from "./ext-enum.service";
export { RemoteDataService, EnsureRemoteData, REMOTE_DATA_TYPE } from "./remote-data.service";
//# sourceMappingURL=index.js.map