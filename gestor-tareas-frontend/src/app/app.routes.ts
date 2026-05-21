import { Routes } from '@angular/router';
import { TasksList } from './components/tasks-list/tasks-list';
import { Login } from './components/login/login';
import { TaskCard } from './components/task-card/task-card';
import { authGuard } from './guards/auth.guard'; //

export const routes: Routes = [
     { // Ruta home — accesible sin autenticación
          path: '/',
          component: Login
     },
     {   // Ruta de login — accesible sin autenticación
          path: 'login',
          component: Login
     },
     {
          path: 'tasks',
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/tasks-list/tasks-list')
                    .then(m => m.TasksList)
     },
     {
          // Ruta con parámetro — detalle de una tarea concreta
          path: 'tareas/:id',
          canActivate: [authGuard],
          loadComponent: () =>
               import('./components/task-card/task-card')
                    .then(m => m.TaskCard)
     },
     {
          // Ruta comodín — para URLs que no existen
          // Debe ser siempre la última ruta
          path: '**',
          redirectTo: 'login'
     }
];