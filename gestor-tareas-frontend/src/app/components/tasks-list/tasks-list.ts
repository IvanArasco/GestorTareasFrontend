import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../services/task';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {

  protected taskService = inject(Task);
  private title = inject(Title);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.taskService.getTasksByUser(userId).subscribe();
    } else {
      this.taskService.getTasks().subscribe();
    }
    this.title.setTitle('GestorTareas - Listado de tareas');
  }

  onStart(id: number): void {
    this.taskService.start(id).subscribe();
  }

  onComplete(id: number): void {
    this.taskService.complete(id).subscribe();
  }

  onDelete(id: number): void {
    this.taskService.delete(id).subscribe();
  }
}
