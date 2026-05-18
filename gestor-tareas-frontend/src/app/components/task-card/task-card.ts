import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',  
})

export class TaskCard {

// @Input() — recibe la tarea del padre
//@Input() task!: TaskRequestDto;

// @Output() — emite un evento al padre cuando se completa la tarea
// EventEmitter<number> indica que el evento lleva un número (el id)
@Output() complete = new EventEmitter<number>();

// @Output() — emite un evento al padre cuando se elimina la tarea
@Output() delete = new EventEmitter<number>();

// Método que se llama al hacer clic en "Complete"
onComplete(): void {
// emit() dispara el evento y pasa el id al padre
//this.complete.emit(this.task.id);
}

// Método que se llama al hacer clic en "Eliminar"
onDelete(): void {
//this.delete.emit(this.task.id);
}
}
