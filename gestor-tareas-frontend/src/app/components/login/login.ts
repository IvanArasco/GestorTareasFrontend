import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private title = inject(Title);

  private fb = inject(FormBuilder);

  error = "";

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
  })

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  ngOnInit(): void {
    this.title.setTitle('GestorTareas — Iniciar sesión');
  }
  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email!, password!)
        .subscribe({
          next: () => {
            this.title.setTitle('GestorTareas — Mis tareas');
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.error = 'Email o contraseña incorrectos';
          }
        });
    } else {
      this.error = 'Completa todos los campos.';
    }
  }
}