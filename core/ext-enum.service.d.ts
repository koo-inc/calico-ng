import { InjectionToken } from '@angular/core';
export declare class ExtEnum {
    NAME: string;
    id: any;
    name: string;
}
export declare class ExtEnumData {
    [key: string]: ExtEnum[];
}
export interface ExtEnumDataProvider {
    getAll: () => ExtEnumData;
}
export declare const EXT_ENUM_DATA_PROVIDER: InjectionToken<ExtEnumDataProvider>;
export declare class ExtEnumService {
    private provider;
    constructor(provider: ExtEnumDataProvider);
    getAll(): ExtEnumData;
    getValues(enumName: string): ExtEnum[];
    getValue(enumName: string, id: any): ExtEnum;
    getValuesMap(...enumNames: string[]): ExtEnumData;
}
