import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { VirtualMachine } from './virtual-machine';

@Injectable({
  providedIn: 'root',
})
export class VirtualMachineService {

  serverHost = `http://${environment.hostname}:${environment.apiPort}`;

  serverURI = `${this.serverHost}/server/`;

  controllerURI = `${this.serverHost}/controller/`;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {}

  getServers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.serverURI).pipe(
      catchError(this.handleError<VirtualMachine[]>('getServers')),
    );
  }

  getControllers(): Observable<VirtualMachine[]> {
    return this.httpClient.get<VirtualMachine[]>(this.controllerURI).pipe(
      catchError(this.handleError<VirtualMachine[]>('getControllers')),
    );
  }

  exportServers(servers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.serverURI}export`, servers).pipe(
      tap((res) => this.log(res)),
      catchError(this.handleError<VirtualMachine[]>('exportServers')),
    );
  }

  exportControllers(controllers: VirtualMachine[]): Observable<VirtualMachine[]> {
    return this.httpClient.post<VirtualMachine[]>(`${this.controllerURI}export`, controllers).pipe(
      tap((res) => this.log(res)),
      catchError(this.handleError<VirtualMachine[]>('exportControllers')),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`VirtualMachineService: ${operation} failed: ${error.message}`);
      this.messageService.add('No response from server, please contact system admin to investigate the issue');
      return of(result as T);
    };
  }

  private log(message: any) {
    if (typeof message === 'string') {
      this.messageService.prompt(String(message));
    }
  }
}
