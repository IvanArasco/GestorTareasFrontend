import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { NotificationComponent } from './components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}