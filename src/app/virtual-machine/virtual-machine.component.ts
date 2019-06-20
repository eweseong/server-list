import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VirtualMachine } from '../virtual-machine';

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.scss'],
})
export class VirtualMachineComponent implements OnInit {

  editable: boolean;

  @Input()
  tableName = 'Table';

  @Input()
  vms: VirtualMachine[] = [];

  @Output()
  serverExport = new EventEmitter();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.editable = params['editable'] || false;
    });
  }

  add() {
    this.vms.push(new VirtualMachine());
  }

  save() {
    this.serverExport.emit(this.vms);
  }

  updateList(id: string, property: string, event: any) {
    const selectedServer = this.vms.find((server) => server.id === id);
    if (selectedServer) {
      selectedServer[property] = event.target.textContent;
    }
  }

  remove(id: string) {
    const removeIndex = this.vms.findIndex((server) => server.id === id);
    this.vms.splice(removeIndex, 1);
  }

}
