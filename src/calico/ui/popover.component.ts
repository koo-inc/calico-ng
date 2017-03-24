import { OnInit, OnDestroy, Directive } from "@angular/core";

@Directive({
  selector: '[cPopover]',
  exportAs: 'cPopover'
})
export class PopoverComponent implements OnInit, OnDestroy {
  private opened = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  open(e: any): void {
    this.opened = true;
  }

  close(e: any): void {
    this.opened = false;
  }

  toggle(e: any): void {
    if (this.opened) {
      this.close(e);
    }
    else {
      this.open(e);
    }
  }
}
