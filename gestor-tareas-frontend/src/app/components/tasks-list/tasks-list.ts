import { Component, inject} from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../services/task';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})

export class TasksList {

  protected taskService = inject(Task);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe();

    this.timer = setInterval(() => {
      console.log('Comprobando tareas...');
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  onComplete(id: number): void {
    this.taskService.complete(id).subscribe();
  }

  onDelete(id: number): void {
    this.taskService.delete(id).subscribe();
  }
}
