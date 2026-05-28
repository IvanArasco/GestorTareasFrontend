import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskResponseDto } from '../../models/task.model';
import { DaysLeftPipe } from '../../pipes/days-left-pipe';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { TaskPriorityPipe } from '../../pipes/task-priority-pipe';

@Component({
  selector: 'app-task-card',
  imports: [DaysLeftPipe, TaskPriorityPipe, RouterLink,RouterLinkActive],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})

export class TaskCard {

  // @Input() — recibe la tarea del padre
  @Input() task!: TaskResponseDto;

  private router = inject(Router);

  protected authService = inject(AuthService);

  // @Output() — emite un evento al padre cuando se inicia la tarea
  // EventEmitter<number> indica que el evento lleva un número (el id)
  @Output() start = new EventEmitter<number>();

  @Output() complete = new EventEmitter<number>();

  @Output() delete = new EventEmitter<number>();

  onStart(): void {
    // emit() dispara el evento y pasa el id al padre
    this.start.emit(this.task.id);
  }

  onComplete(): void {
    this.complete.emit(this.task.id);
  }

  onShowDetails(): void {
    this.router.navigate(['/tasks', this.task.id]);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
