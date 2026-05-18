import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {
// Se ejecuta cuando TareaCard emite el evento (completar)
// id es el valor que el hijo pasó a emit()
onComplete(id: number): void {
  const tarea = this.tasks.find(t => t.id === id);
  if (tarea) {
    tarea.estaCompletada = true;
  }
}

// Se ejecuta cuando TareaCard emite el evento (eliminar)
onDelete(id: number): void {
  this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
