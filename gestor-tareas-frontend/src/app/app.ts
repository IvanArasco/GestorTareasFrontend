import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from './components/task-card/task-card';
import { TasksList } from './components/tasks-list/tasks-list';
import { Login } from './components/login/login';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard, TasksList, Login, AuthService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestor-tareas-frontend');
}