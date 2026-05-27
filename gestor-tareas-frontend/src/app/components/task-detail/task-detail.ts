import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Task } from '../../services/task';
import { TaskResponseDto } from '../../models/task.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth';
import { TaskFrequencyPipe } from '../../pipes/task-frequency-pipe';
import { TaskStatePipe } from '../../pipes/task-state-pipe';
import { TaskTypePipe } from '../../pipes/task-type-pipe';
import { DaysLeftPipe } from '../../pipes/days-left-pipe';
import { TaskPriorityPipe } from '../../pipes/task-priority-pipe';

@Component({
  selector: 'app-task-detail',
  imports: [TaskFrequencyPipe, TaskPriorityPipe, TaskStatePipe, TaskTypePipe, DaysLeftPipe],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})

export class TaskDetail implements OnInit {

  private taskService = inject(Task);
  protected authService = inject(AuthService);
  private router = inject(Router);
  private title = inject(Title);

  @Input() id!: string;
  task = signal<TaskResponseDto | null>(null);

  ngOnInit(): void {
    this.taskService.getTaskById(Number(this.id))
      .subscribe(task => {
        this.task.set(task);
      });

    this.title.setTitle('GestorTareas — Detalle de tarea');

  }

  onComplete(): void {
    this.taskService.complete(Number(this.id)).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error al completar:', err)
    });
  }

  onDelete(): void {
    this.taskService.delete(Number(this.id)).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}