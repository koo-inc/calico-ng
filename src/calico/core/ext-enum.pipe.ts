import { OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { ExtEnumService, ExtEnumData } from "./ext-enum.service";
import { Subscription } from "rxjs";

@Pipe({ name: 'extEnum', pure: false })
export class ExtEnumPipe implements PipeTransform, OnDestroy {
  constructor(
    private extEnumService: ExtEnumService,
  ) {}

  private value: any;
  private enumName: string;
  private propName: string;
  private subscription: Subscription;
  private result: any;

  transform(value: any, ...args: any[]): any {
    let enumName = args[0];
    let propName = args[1] || 'name';

    if(value != this.value || enumName != this.enumName || propName != this.propName){
      this.clean();
      this.value = value;
      this.enumName = enumName;
      this.propName = propName;
      this.subscription = this.extEnumService.values(enumName).subscribe(data => {
        let record = data[enumName].find((e: ExtEnumData) => {return e.id == value});
        this.result = record ? record[propName] : null;
      });
    }
    return this.result;
  }

  ngOnDestroy(): void {
    this.clean();
  }

  private clean(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.value = null;
    this.enumName = null;
    this.propName = null;
    this.subscription = null;
    this.result = null;
  }

}
