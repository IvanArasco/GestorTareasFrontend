import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponseDto {
  token: string;
  expiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7001/api';

  // Signal privado — fuente de verdad del token
  private _token = signal<string | null>(null);

  private _loginSuccess = signal(false);
  

  // Signals públicos de solo lectura
  readonly token = this._token.asReadonly();
  readonly loginSuccess = this._loginSuccess.asReadonly();
  readonly isAuth = computed(() => this._token() !== null);

  login(email: string, password: string) {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/login`,
      { email, password }
    ).pipe(
      // tap guarda el token cuando el login tiene éxito
      tap(response => {
        this._loginSuccess.set(true);
        this._token.set(response.token);
      })
    )
  }

  logout(): void {
    this._token.set(null);
  }
}