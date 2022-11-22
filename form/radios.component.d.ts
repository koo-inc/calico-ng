import { Injector, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormItem } from "./item";
import { Observable } from "rxjs";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";
export declare class RadiosComponent extends FormItem implements OnChanges, OnDestroy {
    private extEnumService;
    private remoteDataService;
    constructor(injector: Injector, extEnumService: ExtEnumService, remoteDataService: RemoteDataService);
    options: any[] | Observable<any[]>;
    remoteData: string;
    extEnum: string;
    optionKey: string;
    optionLabel: string;
    optionValue: string;
    nullOption: boolean;
    nullOptionLabel: string;
    _innerOptions: RadioOption[];
    private subscription;
    ngOnInit(): void;
    writeValue(value: any): void;
    private click(option);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private initOptions();
    private setupOptions(options);
    private getOptionKey(option);
    private getOptionLabel(option);
    private getOptionValue(option);
    private setSelected(value);
}
export interface RadioOption {
    key: any;
    label: string;
    value: any;
    selected: boolean;
}
