import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./episodes').then((m) => m.EpisodesComponent),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./overview').then((m) => m.OverviewComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./details').then((m) => m.DetailsComponent),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./location').then((m) => m.LocationComponent),
  },
];
