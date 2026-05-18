import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from './components/task-card/task-card';
import { TasksList } from './components/tasks-list/tasks-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard, TasksList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestor-tareas-frontend');
}