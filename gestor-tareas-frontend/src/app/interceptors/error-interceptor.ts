// interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../services/notification';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      if (error.status === 403) {
        // Autenticado pero sin permisos
         notificationService.showError('No tienes permisos para esta operación');
      }
      if (error.status === 0) {
        // Error de red - servidor no disponible
        notificationService.showError('No se puede conectar con el servidor');
      }
      // Propagar el error para que los servicios también lo reciban
      return throwError(() => error);
    })
  );
};