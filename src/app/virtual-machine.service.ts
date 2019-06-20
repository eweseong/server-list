import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { VirtualMachine } from './virtual-machine';

@Injectable({
  providedIn: 'root',
})
export class VirtualMachineService {

  serverURI = 'http://localhost:8080/server/';

  controllerURI = 'http://localhost:8080/controller/';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {}

  getServers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.serverURI).pipe(
      // tap((_) => this.log('fetching servers')),
      catchError(this.handleError<VirtualMachine[]>('getServers')),
    );
  }

  getControllers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.controllerURI).pipe(
      // tap((_) => this.log('fetching controllers')),
      catchError(this.handleError<VirtualMachine[]>('getControllers')),
    );
  }

  exportServers(servers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.serverURI}export`, servers).pipe(
      // tap((_) => this.log('exporting servers')),
      catchError(this.handleError<VirtualMachine[]>('exportServers')),
    );
  }

  exportControllers(controllers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.controllerURI}export`, controllers).pipe(
      // tap((_) => this.log('exporting controllers')),
      catchError(this.handleError<VirtualMachine[]>('exportControllers')),
    );
  }

  private log(message: string) {
    this.messageService.add(`VirtualMachineService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
