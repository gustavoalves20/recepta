import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _loginUrl = '/auth/login';
  private readonly _registerUrl = '/auth/register';
  private readonly USER_KEY = 'app_user';
  private readonly _httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<User> {
    return this._httpClient.post<User>(this._loginUrl, { email, password }).pipe(take(1));
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this._httpClient.post<User>(this._registerUrl, { name, email, password }).pipe(
      take(1),
      catchError(error => {
        if (error.status === 409) {
          return throwError(() => new Error('Este email já está cadastrado'));
        }
        return throwError(() => error);
      })
    );
  }

  saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
