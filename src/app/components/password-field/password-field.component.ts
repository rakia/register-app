import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StrengthMeterComponent } from '../strength-meter/strength-meter.component';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, StrengthMeterComponent]
})
export class PasswordFieldComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  @Input() passwordFormControl: FormControl = new FormControl<any>('');

  showPassword = false;
  passwordStrength: number = 0;

  ngOnInit(): void {
    this.passwordFormControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.passwordStrength = this.calculatePasswordStrength(value);
      });
  }

  /**
   * In the passwordRules, we check whether each the user has considered each factor that makes their password stronger.
   * This is reflected on the UI as well to guide the user.
   */
  get passwordRules() {
    const password = this.passwordFormControl.value || '';
    return {
      length: password.length >= 8,
      special: /[!@#$%^&*]/.test(password),
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    };
  }

  calculatePasswordStrength(password: string): number {
    const passwordRules = [
      password.length >= 8,
      /[!@#$%^&*]/.test(password),
      /\d/.test(password),
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
    ];
    return passwordRules.filter(Boolean).length;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
