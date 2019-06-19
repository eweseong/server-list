import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Server } from './server';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  getTestServers(): Observable<Server[]> {
    return this.httpClient.get<Server[]>('http://localhost:8080/server/');
  }

  getTestControllers(): Observable<Server[]> {
    return this.httpClient.get<Server[]>('http://localhost:8080/server/');
  }

  exportServers(servers: Server[]): Observable<Server[]> {
    return this.httpClient.post<Server[]>('http://localhost:8080/server/export', servers);
  }
}
