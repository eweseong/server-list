import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VirtualMachine } from '../virtual-machine';

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.scss'],
})
export class VirtualMachineComponent implements OnInit {

  statuses = [
    { value: '-', label: '-' },
    { value: 'UNUSED', label: 'Unused' },
    { value: 'USED', label: 'Used' },
  ];

  editable: boolean;

  @Input()
  tableName = 'Table';

  @Input()
  vms: VirtualMachine[] = [];

  @Output()
  formDirty = new EventEmitter();

  @Output()
  formSave = new EventEmitter();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.editable = params['editable'] || false;
    });
  }

  trackByIds(vm: VirtualMachine): string {
    return vm.id;
  }

  add() {
    this.vms.push(new VirtualMachine());
  }

  updateList(id: string, property: string, event: any) {
    const selectedServer = this.vms.find((server) => server.id === id);
    if (selectedServer) {
      selectedServer[property] = event.value || event.target.textContent;
      this.formDirty.emit(true);
    }
  }

  remove(id: string) {
    const removeIndex = this.vms.findIndex((server) => server.id === id);
    this.vms.splice(removeIndex, 1);
  }

  save() {
    this.formSave.emit(this.vms);
    this.formDirty.emit(false);
  }

}
