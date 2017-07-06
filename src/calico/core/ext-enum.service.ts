import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export class ExtEnum {
  NAME: string;
  id: any;
  name: string;
}

export class ExtEnumData {
  [key:string]: ExtEnum[];
}

export interface ExtEnumDataProvider {
  getAll: () => ExtEnumData;
}
export const EXT_ENUM_DATA_PROVIDER = new InjectionToken<ExtEnumDataProvider>('ExtEnumDataProvider');

@Injectable()
export class ExtEnumService {
  constructor(
    @Optional() @Inject(EXT_ENUM_DATA_PROVIDER) private provider: ExtEnumDataProvider,
  ) {}

  getAll(): ExtEnumData {
    if(this.provider == null){
      throw new Error('ExtEnumDataProvider not defined');
    }
    return this.provider.getAll();
  }

  getValues(enumName: string): ExtEnum[] {
    let data = this.provider.getAll();
    if(data[enumName] == null){
      throw new Error('unknown ExtEnum key ' + enumName);
    }
    return data[enumName];
  }

  getValue(enumName: string, id: any): ExtEnum {
    return this.getValues(enumName).find((e: ExtEnum) => e.id == id) || null;
  }

  getValuesMap(...enumNames: string[]): ExtEnumData {
    let map: ExtEnumData = {};
    enumNames.forEach((name) => {
      map[name] = this.getValues(name);
    });
    return map;
  }
}
