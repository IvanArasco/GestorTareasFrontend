import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  username = '';
  birthdate = '';
  email = '';
  password = '';

  onSubmit(): void {
    this.authService
    .register(this.username, this.password, this.email, this.birthdate)
    .subscribe({
        next: () => this.router.navigate(['/tareas']),
        error: (err) => console.error('Error en el registro:', err)
      });
  }
}
