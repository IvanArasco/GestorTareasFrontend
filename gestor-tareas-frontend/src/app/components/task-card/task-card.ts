import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { TaskResponseDto } from '../../models/task.model';
import { TaskStatePipe } from '../../pipes/task-state-pipe';
import { NgClass } from '@angular/common';
import { TaskTypePipe } from '../../pipes/task-type-pipe';
import { DaysLeftPipe } from '../../pipes/days-left-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [NgClass, TaskStatePipe, TaskTypePipe, DaysLeftPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})

export class TaskCard {

  // @Input() — recibe la tarea del padre
  @Input() task!: TaskResponseDto;

  private router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      const tareaAnterior = changes['task'].previousValue;
      const tareaNueva = changes['task'].currentValue;

      if (!changes['task'].firstChange) {
        console.log('La tarea cambió:', tareaAnterior, '→', tareaNueva);
      }
    }
  }

  // @Output() — emite un evento al padre cuando se inicia la tarea
  // EventEmitter<number> indica que el evento lleva un número (el id)
  @Output() start = new EventEmitter<number>();

  // @Output() — emite un evento al padre cuando se completa la tarea
  // EventEmitter<number> indica que el evento lleva un número (el id)
  @Output() complete = new EventEmitter<number>();

  // @Output() — emite un evento al padre cuando se elimina la tarea
  @Output() delete = new EventEmitter<number>();

  // Método que se llama al hacer clic en "Iniciar"
  onStart(): void {
    // emit() dispara el evento y pasa el id al padre
    this.start.emit(this.task.id);
  }

  // Método que se llama al hacer clic en "Complete"
  onComplete(): void {
    // emit() dispara el evento y pasa el id al padre
    this.complete.emit(this.task.id);
  }

  onShowDetails(): void {
    this.router.navigate(['/tasks', this.task.id]);
  }

  // Método que se llama al hacer clic en "Eliminar"
  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
