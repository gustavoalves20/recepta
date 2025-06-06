import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  user!: User | null;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.user = this._authService.getUser();
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
