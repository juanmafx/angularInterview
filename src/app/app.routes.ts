import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'drug-categories'
  },
  {
    path: 'drug-categories',
    loadComponent: () =>
      import('./features/drug-categories/drug-categories.component').then(
        (m) => m.DrugCategoriesComponent
      )
  }
];
