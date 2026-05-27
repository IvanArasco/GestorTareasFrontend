import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Task } from '../../services/task';
import { TaskResponseDto } from '../../models/task.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { TaskFrequencyPipe } from '../../pipes/task-frequency-pipe';

@Component({
  selector: 'app-task-detail',
  imports: [NgClass, TaskFrequencyPipe],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})

export class TaskDetail implements OnInit {

  private taskService = inject(Task);
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