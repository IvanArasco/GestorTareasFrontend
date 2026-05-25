import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private title = inject(Title);

  private fb = inject(FormBuilder);

  error = "";

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
  })

  get username() { return this.form.get('username'); }
  get birthdate() { return this.form.get('birthdate'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  
  ngOnInit(): void {
    this.title.setTitle('GestorTareas — Registro');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { username, password, email, birthdate } = this.form.value;
      this.authService
        .register(username!, password!, email!, birthdate!)
        .subscribe({
          next: () => {
            this.title.setTitle('GestorTareas — Mis tareas');
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.error = 'Email o contraseña incorrectos.';
          }
        });
    } else {
      this.error = 'Completa todos los campos.';
    }
  }
}
