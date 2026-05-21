import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
     {
          path: '',
          loadComponent: () =>
               import('./components/login/login').then(m => m.Login)
     },
     {
          path: 'login',
          loadComponent: () =>
               import('./components/login/login').then(m => m.Login)
     },
     {
          path: 'tasks',
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/tasks-list/tasks-list').then(m => m.TasksList)
     },
     {
          path: 'tareas/:id',
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/task-card/task-card').then(m => m.TaskCard)
     },
     {
          path: '**',
          redirectTo: 'login'
     }
];