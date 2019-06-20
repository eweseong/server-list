import { Component, OnInit } from '@angular/core';

import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-controllers',
  templateUrl: './test-controllers.component.html',
  styleUrls: ['./test-controllers.component.scss'],
})
export class TestControllersComponent implements OnInit {

  controllers: VirtualMachine[] = [];

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.vmService.getControllers().subscribe((controllers) => {
      if (controllers) {
        this.controllers = controllers;
      }
    });
  }

  export(controllers) {
    this.vmService.exportControllers(controllers).subscribe((res) => console.log(res));
  }

}
