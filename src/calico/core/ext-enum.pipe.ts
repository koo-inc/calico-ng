import { Pipe, PipeTransform } from "@angular/core";
import { ExtEnumService } from "./ext-enum.service";

@Pipe({ name: 'extEnum' })
export class ExtEnumPipe implements PipeTransform {
  constructor(
    private extEnumService: ExtEnumService,
  ) {}

  transform(value: any, ...args: any[]): any {
    let enumName = args[0];
    let propName = args[1] || 'name';

    if(enumName == null) return null;
    let extEnum = this.extEnumService.getValue(enumName, value);
    return extEnum ? extEnum[propName] : null;
  }

}
