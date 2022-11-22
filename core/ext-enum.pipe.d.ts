import { PipeTransform } from "@angular/core";
import { ExtEnumService } from "./ext-enum.service";
export declare class ExtEnumPipe implements PipeTransform {
    private extEnumService;
    constructor(extEnumService: ExtEnumService);
    transform(value: any, ...args: any[]): any;
}
