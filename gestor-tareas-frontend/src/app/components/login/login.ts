import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private title = inject(Title);

  email = '';
  password = '';
  error: string = '';

  ngOnInit(): void {
    this.title.setTitle('GestorTareas — Iniciar sesión');
  }
  onSubmit(): void {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.title.setTitle('GestorTareas — Mis tareas');
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.error = 'Email o contraseña incorrectos';
        }
      });
  }
}