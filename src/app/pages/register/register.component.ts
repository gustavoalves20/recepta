import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarHelper } from '../../utils/snack-bar-helper';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this._authService.register(this.name.value, this.email.value, this.password.value).subscribe({
        next: () => {
          this._router.navigate(['/login']);
          SnackBarHelper.showMessage(this._snackBar, 'Cadastro realizado com sucesso');
        },
        error: (error) => {
          if (error.message === 'Este email já está cadastrado') {
            this.email.setErrors({ emailExists: true });
          } else {
            SnackBarHelper.showMessage(this._snackBar,'Erro no cadastro, tente novamente');
          }
        },
      }
    );
  }
}
