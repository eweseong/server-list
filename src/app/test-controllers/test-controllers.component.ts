import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { ComponentCanDeactivate } from '../pending-changes.guard';
import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-controllers',
  templateUrl: './test-controllers.component.html',
  styleUrls: ['./test-controllers.component.scss'],
})
export class TestControllersComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  private destroyed$: Subject<{}> = new Subject();

  busy: Subscription;

  controllers: VirtualMachine[] = [];

  dirty = false;

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.busy = this.vmService.getControllers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((controllers) => {
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
    this.busy = this.vmService.exportControllers(controllers)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
