import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isLoginPage(): boolean {
    const url = this._router.url;
    return url === '/login' || url === '/register';
  }

  isLogged(): boolean {
    return this._authService.isLoggedIn();
  }
}
