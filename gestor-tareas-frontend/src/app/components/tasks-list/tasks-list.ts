import { Component } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskResponseDto } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {
   tasks: TaskResponseDto[] = []; // TO DO get tasks array

  onComplete(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.taskStatus = 'Completed';
    }
  }

  onDelete(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

}
