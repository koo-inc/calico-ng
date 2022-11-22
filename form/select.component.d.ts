import { Injector, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormItem } from "./item";
import { Observable } from "rxjs";
import { ExtEnumService } from "../core/ext-enum.service";
import { RemoteDataService } from "../core/remote-data.service";
export declare class SelectComponent extends FormItem implements OnChanges, OnDestroy {
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
    _innerSelectValue: any;
    _innerOptions: SelectOption[];
    private subscription;
    ngOnInit(): void;
    writeValue(value: any): void;
    selectValue: any;
    trackBy(idx: any, option: any): any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private initOptions();
    private setupOptions(options);
    private getOptionKey(option);
    private getOptionLabel(option);
    private getOptionValue(option);
}
export interface SelectOption {
    key: any;
    label: string;
    value: any;
}
