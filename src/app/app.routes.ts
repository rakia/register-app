import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect empty path to 'sign-up' view
  { path: '', loadChildren: () => import('./components/register.routes') },
];
