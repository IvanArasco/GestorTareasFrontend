import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { NotificationComponent } from './components/notification/notification';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NotificationComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}