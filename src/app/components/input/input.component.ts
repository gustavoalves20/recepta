import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  showPassword: boolean = false;

  @Input()
  label: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  type: string = 'text';
  @Input()
  control!: FormControl;
  @Input()
  icon: string = '';
  @Input()
  errorMessage?: string;

  get currentType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get showError(): boolean {
    return (
      this.control?.invalid && (this.control.dirty || this.control.touched)
    );
  }

  get errorText(): string | null {
    if (!this.control || !this.control.errors) return null;

    if (this.control.hasError('required')) {
      return this.errorMessage || 'Campo obrigatório';
    }
    if (this.control.hasError('email')) {
      return 'Email inválido';
    }
    if (this.control.hasError('minlength')) {
      const requiredLength = this.control.errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }
    if (this.control.hasError('emailExists')) {
      return 'Este email já está em uso';
    }
    return null;
  }
}
