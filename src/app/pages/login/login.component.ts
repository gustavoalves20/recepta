import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snack-bar-helper';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginInvalido = false;

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {
    this.loginInvalido = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._authService.login(this.email.value, this.password.value).subscribe({
      next: (user ) => {
        this._authService.saveUser(user);
        this._router.navigate(['home']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.loginInvalido = true;
          SnackBarHelper.showMessage(this._snackbar, 'Email e/ou senha inválidas');
        } else {
          SnackBarHelper.showMessage(this._snackbar, 'Ocorreu um erro');
        }
      },
    });
  }
}
