import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentCanDeactivate } from '../pending-changes.guard';
import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-servers',
  templateUrl: './test-servers.component.html',
  styleUrls: ['./test-servers.component.scss'],
})
export class TestServersComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  private destroyed$: Subject<{}> = new Subject();

  busy: Subscription;

  servers: VirtualMachine[] = [];

  dirty = false;

  constructor(private vmService: VirtualMachineService) { }

  ngOnInit() {
    this.busy = this.vmService.getServers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((servers) => {
        if (servers) {
          this.servers = servers;
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

  onFormSaved(servers: VirtualMachine[]) {
    this.busy = this.vmService.exportServers(servers)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
