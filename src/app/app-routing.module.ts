import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PendingChangesGuard } from './pending-changes.guard';
import { TestControllersComponent } from './test-controllers/test-controllers.component';
import { TestServersComponent } from './test-servers/test-servers.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'servers',
  },
  {
    path: 'servers',
    component: TestServersComponent,
    pathMatch: 'full',
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'controllers',
    component: TestControllersComponent,
    pathMatch: 'full',
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
