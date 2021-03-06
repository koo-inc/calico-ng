import { Injectable, Component, Injector, InjectionToken } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { trigger, style, transition, animate, keyframes } from "@angular/animations";
import { randomString } from "../util/string";
import { filter } from "rxjs/operators";

export const ALERT_CONFIG = new InjectionToken<AlertConfig>('AlertConfig');

export interface AlertOptions {
  position?: string;
  lifetime?: number;
}

export interface AlertConfig {
  common?: AlertOptions;
  success?: AlertOptions;
  info?: AlertOptions;
  warning?: AlertOptions;
  danger?: AlertOptions;
  removeTypesOnNavigationStart?: string[];
  removeTypesOnSubmitForm?: string[];
}

export interface AlertMessage {
  type: string;
  title: string;
  messages: string[];
  position: string;
  lifetime: number;
  key: string;
  state: string;
}

@Injectable()
export class AlertService {
  constructor(
    private injector: Injector,
    private router: Router
  ) {
    try {
      this.config = this.injector.get(ALERT_CONFIG, {});
    }
    catch (e) {
      console.warn("use ALERT_CONFIG token to provide AlertConfig instead of 'AlertConfig' string.");
      this.config = this.injector.get('AlertConfig', {});
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => {
        this.removeByType(...(this.config.removeTypesOnNavigationStart || ['warning', 'danger']));
    });
  }

  config: AlertConfig;
  messages: {[key:string]: AlertMessage[]} = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
  };

  success(title: string, messages?: string[], opts?: AlertOptions): void {
    this.addMessage(this.createMessage('success', title, messages, opts));
  }

  info(title: string, messages?: string[], opts?: AlertOptions): void {
    this.addMessage(this.createMessage('info', title, messages, opts));
  }

  warning(title: string, messages?: string[], opts?: AlertOptions): void {
    this.addMessage(this.createMessage('warning', title, messages, opts));
  }

  danger(title: string, messages?: string[], opts?: AlertOptions): void {
    this.addMessage(this.createMessage('danger', title, messages, opts));
  }

  removeByType(...types: string[]): void {
    Object.forEach(this.messages, (messages: AlertMessage[]) => {
      messages.remove((e: AlertMessage) => types.indexOf(e.type) != -1);
    });
  }

  onSubmitForm(): void {
    this.removeByType(...(this.config.removeTypesOnSubmitForm || ['warning', 'danger']));
  }

  private createMessage(type: string, title: string, messages: string[], opts?: AlertOptions): AlertMessage {
    let message: AlertMessage = Object.assign(
      {},
      this.config.common || {},
      this.config[type] || {},
      opts || {},
      { type: type, title: title, messages: messages },
    ) as AlertMessage;
    message.position = this.normalizePosition(message.position);
    message.key = randomString(8);
    message.state = message.position.indexOf('left') != -1 ? 'in-left' : 'in-right';
    return message;
  }
  private normalizePosition(position: string): string {
    let v = position == null || position.indexOf('bottom') == -1 ? 'top' : 'bottom';
    let h = position == null || position.indexOf('left') == -1 ? 'right' : 'left';
    return v + '-' + h;
  }

  private addMessage(message: AlertMessage): void {
    if(message.position.indexOf('top') != -1){
      this.messages[message.position].unshift(message);
    }else{
      this.messages[message.position].push(message);
    }
    if(message.lifetime != null && message.lifetime >= 0){
      setTimeout(() => {
        this.removeMessage(message);
      }, message.lifetime);
    }
  }

  removeMessage(message: any): void {
    this.messages[message.position].remove((e: AlertMessage) => e.key == message.key);
  }
}

@Component({
  selector: 'c-alert',
  template: `
    <div class="c-alert">
      <ng-container *ngFor="let vertical of ['top', 'bottom']">
        <ng-container *ngFor="let horizontal of ['left', 'right']">
          <div class="alert-container" [ngClass]="{'top': vertical == 'top', 'bottom': vertical == 'bottom', 'left': horizontal == 'left', 'right': horizontal == 'right'}">
            <div *ngFor="let message of messages[vertical + '-' + horizontal];trackBy: identify"
                 class="alert alert-{{message.type}}"
                 [@state]="message.state">
              <a class="close" (click)="removeMessage(message)">×</a>
              <span style="white-space: pre-wrap">{{message.title}}</span>
              <ng-container *ngIf="message.messages">
                <ul>
                  <li *ngFor="let m of message.messages">{{m}}</li>
                </ul>
              </ng-container>
            </div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
  `],
  animations: [
    trigger('state', [
      transition('void => in-left', [
        animate(300, keyframes([
          style({
            height: 0,
            padding: 0,
            margin: 0,
            transform: 'translateX(-100%)',
            opacity: 0,
            offset: 0,
          }),
          style({
            height: '*',
            padding: '*',
            margin: '*',
            offset: 0.3,
          }),
          style({
            transform: 'translateX(0)',
            opacity: 0.9,
            offset: 1.0,
          }),
        ]))
      ]),
      transition('void => in-right', [
        animate(300, keyframes([
          style({
            height: 0,
            padding: 0,
            margin: 0,
            transform: 'translateX(100%)',
            opacity: 0,
            offset: 0,
          }),
          style({
            height: '*',
            padding: '*',
            margin: '*',
            offset: 0.3,
          }),
          style({
            transform: 'translateX(0)',
            opacity: 0.9,
            offset: 1.0,
          }),
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({
            offset: 0,
          }),
          style({
            opacity: 0,
            height: '*',
            padding: '*',
            margin: '*',
            offset: 0.7,
          }),
          style({
            height: 0,
            padding: 0,
            margin: 0,
            offset: 1.0,
          }),
        ]))
      ]),
    ])
  ]
})
export class AlertComponent {
  constructor(
    private alertService: AlertService,
  ) {}

  identify(index: number, message: any): any {
    return message.key;
  }

  get messages() {
    return this.alertService.messages;
  }

  removeMessage(message: any) {
    this.alertService.removeMessage(message);
  }
}
