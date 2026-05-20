import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  protected authService = inject(AuthService);

  email = '';
  password = '';

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe();
  }
}