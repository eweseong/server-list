import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService } from 'ng-busy';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'default-busy',
  templateUrl: './custom-busy.component.html',
  styleUrls: ['./custom-busy.component.scss'],
})
export class CustomBusyComponent {

  constructor(@Inject('instanceConfigHolder') private instanceConfigHolder: InstanceConfigHolderService) {
  }

  get message() {
    return this.instanceConfigHolder.config.message;
  }

}
