import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BUSY_CONFIG_DEFAULTS, BusyConfig, NgBusyModule  } from 'ng-busy';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomBusyComponent } from './custom-busy/custom-busy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { PendingChangesGuard } from './pending-changes.guard';
import { TestControllersComponent } from './test-controllers/test-controllers.component';
import { TestServersComponent } from './test-servers/test-servers.component';
import { VirtualMachineComponent } from './virtual-machine/virtual-machine.component';

const busyConfig: BusyConfig = {
  message: `Please wait ...`,
  template: CustomBusyComponent,
  templateNgStyle: BUSY_CONFIG_DEFAULTS.templateNgStyle,
  delay: BUSY_CONFIG_DEFAULTS.delay,
  disableAnimation: BUSY_CONFIG_DEFAULTS.disableAnimation,
  minDuration: BUSY_CONFIG_DEFAULTS.minDuration,
  backdrop: BUSY_CONFIG_DEFAULTS.backdrop,
  wrapperClass: BUSY_CONFIG_DEFAULTS.wrapperClass,
};

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
    NgBusyModule.forRoot(busyConfig),
    HttpClientModule,
    AppRoutingModule,
    // Angular Material Components
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  entryComponents: [
    CustomBusyComponent,
  ],
  providers: [
    PendingChangesGuard,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
