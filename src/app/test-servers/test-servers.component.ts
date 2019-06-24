import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-servers',
  templateUrl: './test-servers.component.html',
  styleUrls: ['./test-servers.component.scss'],
})
export class TestServersComponent implements OnInit {

  busy: Subscription;

  servers: VirtualMachine[] = [];

  constructor(private vmService: VirtualMachineService) { }

  ngOnInit() {
    this.busy = this.vmService.getServers().subscribe((servers) => {
      if (servers) {
        this.servers = servers;
      }
    });
  }

  export(servers: VirtualMachine[]) {
    this.busy = this.vmService.exportServers(servers).subscribe((res) => console.log(res));
  }

}
