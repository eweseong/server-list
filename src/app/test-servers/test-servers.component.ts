import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ComponentCanDeactivate } from '../pending-changes.guard';
import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-servers',
  templateUrl: './test-servers.component.html',
  styleUrls: ['./test-servers.component.scss'],
})
export class TestServersComponent implements OnInit, ComponentCanDeactivate {

  busy: Subscription;

  servers: VirtualMachine[] = [];

  dirty = false;

  constructor(private vmService: VirtualMachineService) { }

  ngOnInit() {
    this.busy = this.vmService.getServers().subscribe((servers) => {
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
    this.busy = this.vmService.exportServers(servers).subscribe((res) => console.log(res));
  }

}
