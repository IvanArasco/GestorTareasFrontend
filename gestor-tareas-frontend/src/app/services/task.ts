import { computed, Injectable, signal, inject } from '@angular/core';
import { Status, TaskRequestDto, TaskResponseDto } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Task {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7001/api';

  private _tasks = signal<TaskResponseDto[]>([]);

  readonly tasks = this._tasks.asReadonly(); // signal público de solo lectura — los componentes solo leen

  // computed - se recalcula automáticamente cuando cambia _tasks ( pending - in progress - completed)
  readonly totalTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus).length
  );

  readonly pendingTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === Status.Pending)
  );

  readonly inProgressTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === Status.InProgress)
  );

  readonly completedTasks = computed(() =>
    this._tasks().filter(t => t.taskStatus === Status.Completed)
  );

  // GET /api/tasks
  getTasks() {
    return this.http.get<TaskResponseDto[]>(
      `${this.baseUrl}/tasks`
    ).pipe(
      tap(tasks => this._tasks.set(tasks))
    );
  }

  // GET /api/tasks/:id
  getTaskById(id: number) {
    return this.http.get<TaskResponseDto>(
      `${this.baseUrl}/tasks/${id}`
    )
  }

  // GET /api/tasks/user:id
  getTasksByUser(userId: string) {
    return this.http.get<TaskResponseDto[]>(
      `${this.baseUrl}/tasks/by-user/${userId}`
    ).pipe(
      tap(tasks => this._tasks.set(tasks))
    );
  }

  createTask(dto: TaskRequestDto) {
    return this.http.post<TaskResponseDto>(
      `${this.baseUrl}/tasks`, dto
    ).pipe(
      tap(task => this._tasks.update(tasks => [...tasks, task]))
    );
  }

  edit(id: number, dto: TaskRequestDto) {
    return this.http.put<TaskResponseDto>(
      `${this.baseUrl}/tasks/${id}`, dto
    ).pipe(
      tap(updatedTask => {
        if (updatedTask) {
          this._tasks.update(tasks =>
            tasks.map(t => t.id === id ? updatedTask : t)
          );
        }
      })
    );
  }

  complete(id: number) {
    return this.http.patch<void>(
      `${this.baseUrl}/tasks/${id}/complete`, {}
    ).pipe(
      tap(() => this._tasks.update(tasks =>
        tasks.map(t => t.id === id ? { ...t, taskStatus: Status.Completed } : t)
      ))
    );
  }

  start(id: number) {
    return this.http.patch<void>(
      `${this.baseUrl}/tasks/${id}/start`, {}
    ).pipe(
      tap(() => this._tasks.update(tasks =>
        tasks.map(t => t.id === id ? { ...t, taskStatus: Status.InProgress } : t)
      ))
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/tasks/${id}`
    ).pipe(
      tap(() => this._tasks.update(tasks => tasks.filter(t => t.id !== id)))
    );
  }
}
