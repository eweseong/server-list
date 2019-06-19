import { Component, OnInit } from '@angular/core';

import { Server } from './server';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  testServers: Server[] = [];

  testControllers: Server[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.serverService.getTestServers().subscribe((testServers) => this.testServers = testServers);

    this.serverService.getTestControllers().subscribe((testControllers) => this.testControllers = testControllers);
  }
}
