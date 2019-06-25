import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ComponentCanDeactivate } from '../pending-changes.guard';
import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-controllers',
  templateUrl: './test-controllers.component.html',
  styleUrls: ['./test-controllers.component.scss'],
})
export class TestControllersComponent implements OnInit, ComponentCanDeactivate {

  busy: Subscription;

  controllers: VirtualMachine[] = [];

  dirty = false;

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.busy = this.vmService.getControllers().subscribe((controllers) => {
      if (controllers) {
        this.controllers = controllers;
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    return !this.dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = 'Warning!!';
    }
  }

  onFormDirtied(dirty: boolean) {
    this.dirty = dirty;
  }

  onFormSaved(controllers: VirtualMachine[]) {
    this.busy = this.vmService.exportControllers(controllers).subscribe((res) => console.log(res));
  }

}
