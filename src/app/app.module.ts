import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyConfig, NgBusyModule } from 'ng-busy';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomBusyComponent } from './custom-busy/custom-busy.component';
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
    CustomBusyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgBusyModule.forRoot(new BusyConfig({
      message: `Please wait ...`,
      template: CustomBusyComponent,
    })),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    // Angular Material Components
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
  ],
  entryComponents: [
    CustomBusyComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
