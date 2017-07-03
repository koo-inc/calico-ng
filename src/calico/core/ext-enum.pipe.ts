import { OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { ExtEnumService, ExtEnumData } from "./ext-enum.service";
import { Subscription } from "rxjs";

@Pipe({ name: 'extEnum', pure: false })
export class ExtEnumPipe implements PipeTransform, OnDestroy {
  constructor(
    private extEnumService: ExtEnumService,
  ) {}

  private key: string;
  private result: any;
  private subscription: Subscription;

  transform(value: any, ...args: any[]): any {
    let enumName = args[0];
    let propName = args[1] || 'name';
    let key = '{0}:{1}:{2}'.format(enumName, propName, value);

    if(key != this.key){
      this.clean();
      this.key = key;
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
    this.key = null;
    this.result = null;
    this.subscription = null;
  }

}
