import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'live-rates',
        loadComponent: () => import('./features/live-rates/live-rates').then((m) => m.LiveRates),
      },
      {
        path: 'configurations',
        loadComponent: () => import('./features/configurations/configurations').then((m) => m.Configurations),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
];
