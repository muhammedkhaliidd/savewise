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
        path: 'savings',
        loadComponent: () => import('./features/savings/savings').then((m) => m.Savings),
      },
      {
        path: 'goals',
        loadComponent: () => import('./features/goals/goals').then((m) => m.Goals),
      },
      {
        path: 'savings-calc',
        loadComponent: () =>
          import('./features/savings-calc/savings-calc').then((m) => m.SavingsCalc),
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
