import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VirtualMachine } from './virtual-machine';

@Injectable({
  providedIn: 'root',
})
export class VirtualMachineService {

  serverURI = 'http://localhost:8080/server/';

  controllerURI = 'http://localhost:8080/server/';

  constructor(private httpClient: HttpClient) {}

  getServers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.serverURI);
  }

  getControllers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.controllerURI);
  }

  exportServers(servers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.serverURI}export`, servers);
  }

  exportControllers(servers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.controllerURI}export`, servers);
  }
}
