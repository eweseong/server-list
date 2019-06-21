import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { TestControllersComponent } from './test-controllers/test-controllers.component';
import { TestServersComponent } from './test-servers/test-servers.component';
import { VirtualMachineComponent } from './virtual-machine/virtual-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestServersComponent,
    TestControllersComponent,
    VirtualMachineComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
