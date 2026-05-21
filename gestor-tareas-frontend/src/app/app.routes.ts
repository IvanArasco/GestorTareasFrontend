import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
     {
          // Nos redirige al login para cargar ahí el componente 1 vez.
          path: '', redirectTo: 'login', pathMatch: 'full' 
     },
     {
          path: 'login',
          canActivate: [guestGuard],
          loadComponent: () =>
               import('./components/login/login').then(m => m.Login)
     },
     {
          path: 'register',
          canActivate: [guestGuard],
          loadComponent: () =>
               import('./components/register/register').then(m => m.Register)
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