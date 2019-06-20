import { Component, OnInit } from '@angular/core';

import { VirtualMachine } from '../virtual-machine';
import { VirtualMachineService } from '../virtual-machine.service';

@Component({
  selector: 'app-test-servers',
  templateUrl: './test-servers.component.html',
  styleUrls: ['./test-servers.component.scss'],
})
export class TestServersComponent implements OnInit {

  servers: VirtualMachine[] = [];

  constructor(private vmService: VirtualMachineService) { }

  ngOnInit() {
    this.vmService.getServers().subscribe((servers) => this.servers = servers);
  }

  export(servers) {
    this.vmService.exportServers(servers).subscribe((res) => console.log(res));
  }

}
