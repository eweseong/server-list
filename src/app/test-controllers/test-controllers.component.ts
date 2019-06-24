import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-controllers',
  templateUrl: './test-controllers.component.html',
  styleUrls: ['./test-controllers.component.scss'],
})
export class TestControllersComponent implements OnInit {

  busy: Subscription;

  controllers: VirtualMachine[] = [];

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.busy = this.vmService.getControllers().subscribe((controllers) => {
      if (controllers) {
        this.controllers = controllers;
      }
    });
  }

  export(controllers: VirtualMachine[]) {
    this.busy = this.vmService.exportControllers(controllers).subscribe((res) => console.log(res));
  }

}
