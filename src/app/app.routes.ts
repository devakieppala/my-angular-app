import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: 'dashboard', //Authorized URL
    canActivate: [MsalGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  }, {
    path: '', //Empty path
    loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent),
    pathMatch: 'full'
  },
  {
    path: '*', //Unmatched URL
    loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent),
  }
];
