import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private title = inject(Title);

  username = '';
  birthdate = '';
  email = '';
  password = '';
  error = '';

  ngOnInit(): void {
    this.title.setTitle('GestorTareas — Registro de usuario');
  }

  onSubmit(): void {
    this.authService
      .register(this.username, this.password, this.email, this.birthdate)
      .subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error('Error en el registro:', err)
      });
  }
}
