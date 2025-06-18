// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'groceries',
    loadComponent: () =>
      import('./components/groceries-list/groceries-list.component').then(
        (m) => m.GroceriesListComponent
      ),
  },
  // {
  //   path: 'maintenance',
  //   loadComponent: () =>
  //     import('./maintenance/maintenance.component').then(m => m.MaintenanceComponent)
  // }
];
