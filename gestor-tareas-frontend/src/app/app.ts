import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from './components/task-card/task-card';
import { TasksList } from './components/tasks-list/tasks-list';
import { LoginComponent } from './components/login/login';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard, TasksList, LoginComponent, AuthService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestor-tareas-frontend');
   protected authService = inject(AuthService);
}