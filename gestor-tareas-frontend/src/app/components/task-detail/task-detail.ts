import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Task } from '../../services/task';
import { TaskResponseDto } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements OnInit {

  private taskService = inject(Task);

  @Input() id!: string;
  task = signal<TaskResponseDto | null>(null);

  ngOnInit(): void {
    const id = Number(this.id);

    if (this.taskService.tasks().length === 0) {
      this.taskService.getTasks().subscribe(() => this.findTask(id));
    } else {
      this.findTask(id);
    }
  }

  private findTask(id: number): void {
    const found = this.taskService.tasks().find(t => t.id === id);
    this.task.set(found ?? null);
  }
}