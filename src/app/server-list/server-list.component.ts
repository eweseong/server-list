import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Server } from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss'],
})
export class ServerListComponent implements OnInit {
  title = 'server-list';

  @Input()
  tableName = 'Table';

  @Input()
  serverList: Server[] = [];

  editable: boolean;

  constructor(private route: ActivatedRoute, private serverService: ServerService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.editable = params['editable'] || false;
    });
  }

  add() {
    this.serverList.push(new Server());
  }

  save() {
    this.serverService.exportServers(this.serverList).subscribe((res) => console.log(res));
  }

  updateList(id: string, property: string, event: any) {
    const selectedServer = this.serverList.find((server) => server.id === id);
    if (selectedServer) {
      selectedServer[property] = event.target.textContent;
    }
  }

  remove(id: string) {
    const removeIndex = this.serverList.findIndex((server) => server.id === id);
    this.serverList.splice(removeIndex, 1);
  }
}
