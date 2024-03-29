import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
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

  @ViewChild('btnSave')
  btnSave: MatButton;

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

  @HostListener('document:keydown', ['$event'])
  onSaveShortcutPressed(event: KeyboardEvent): void {
    const charCode = event.key.toLowerCase();
    if (event.ctrlKey && charCode === 's') {
      event.preventDefault();
      this.btnSave.focus();
      this.save();
    }
  }

  trackByIds(vm: VirtualMachine): string {
    return vm.id;
  }

  add(): void {
    this.vms.push(new VirtualMachine());
  }

  updateList(id: string, property: string, event: any): void {
    const selectedServer = this.vms.find((server) => server.id === id);
    if (selectedServer) {
      const oldValue = selectedServer[property];
      const newValue = event.value || event.target.textContent;
      if (oldValue !== newValue) {
        selectedServer[property] = newValue;
        this.formDirty.emit(true);
      }
    }
  }

  remove(id: string): void {
    const removeIndex = this.vms.findIndex((server) => server.id === id);
    if (removeIndex > -1) {
      this.vms.splice(removeIndex, 1);
    }
  }

  reset(id: string): void {
    // TODO - YEO (Jul 23, 2019): reset owner value and description
    const selectedServer = this.vms.find((server) => server.id === id);
    if (selectedServer) {
      selectedServer.owner = '';
      selectedServer.status = 'UNUSED';
      selectedServer.description = '';
      this.formDirty.emit(true);
    }
  }

  save(): void {
    this.formSave.emit(this.vms);
    this.formDirty.emit(false);
  }

}
