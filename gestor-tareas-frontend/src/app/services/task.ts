import { computed, Injectable, signal, inject } from '@angular/core';
import { Status, TaskResponseDto } from '../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})

export class Task {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = 'https://localhost:7001/api';

  private _tasks = signal<TaskResponseDto[]>([]);

  readonly tasks = this._tasks.asReadonly(); // signal público de solo lectura — los componentes solo leen

  // computed — se recalcula automáticamente cuando cambia _tasks ( pending - in progress - completed)
  readonly pendingTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === 'Pending').length
  );

  readonly inProgressTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === 'InProgress').length
  );

  readonly completedTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === 'Completed').length
  );

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  // GET /api/tareas
  getTasks() {
    return this.http.get<TaskResponseDto[]>(
      `${this.baseUrl}/tasks`, { headers: this.headers }
    ).pipe(
      //map(respuesta => respuesta.datos),
      tap(tasks => this._tasks.set(tasks)), // actualizar el Signal
      catchError(err => this.showError(err))
    );
  }

  // GET /api/tareas/:id
  getTaskById(id: number) {
    return this.http.get<TaskResponseDto>(
      `${this.baseUrl}/tasks/${id}`);
  }

  complete(id: number) {
    return this.http.put<void>(
      `${this.baseUrl}/tasks/${id}`, {}, { headers: this.headers }
    ).pipe(
      tap(() => this._tasks.update(tasks =>
        tasks.map(t => t.id === id ? { ...t, taskStatus: 'Completed' as Status } : t)
      )),
      catchError(err => this.showError(err))
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/tasks/${id}`, { headers: this.headers }
    ).pipe(
      tap(() => this._tasks.update(tasks => tasks.filter(t => t.id !== id))),
      catchError(err => this.showError(err))
    );
  }

  private showError(error: any) {
    console.error('Error HTTP:', error);
    return of(null);
  }
}
