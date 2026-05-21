import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../services/task';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {

  protected taskService = inject(Task);
  private title = inject(Title);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe();
    this.title.setTitle('GestorTareas — Listado de tareas');
  }

  onComplete(id: number): void {
    this.taskService.complete(id).subscribe();
  }

  onDelete(id: number): void {
    this.taskService.delete(id).subscribe();
  }
}
