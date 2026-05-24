import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
     {
          path: '', redirectTo: 'tasks', pathMatch: 'full'
     },
     {
          path: 'login', // inicio de sesión
          canActivate: [guestGuard],
          loadComponent: () =>
               import('./components/login/login').then(m => m.Login)
     },
     {
          path: 'register', // creación de cuenta
          canActivate: [guestGuard],
          loadComponent: () =>
               import('./components/register/register').then(m => m.Register)
     },
     {
          path: 'tasks', // listado completo de tareas
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/tasks-list/tasks-list').then(m => m.TasksList)
     },
     {
          path: 'tasks/:id', // tarea específica
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/task-detail/task-detail').then(m => m.TaskDetail)
     },
      {
          path: 'tasks/user/:id', // listado de tareas del usuario
          canActivate: [authGuard],
          loadComponent: () =>
                import('./components/tasks-list/tasks-list').then(m => m.TasksList)
     },
     {
          path: '**',
          redirectTo: 'login'
     }
];