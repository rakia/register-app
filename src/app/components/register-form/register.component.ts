import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PasswordFieldComponent } from '../password-field/password-field.component';

@Component({
    selector: 'register-form',
    templateUrl: './register.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    PasswordFieldComponent,
  ],
})
export class RegisterComponent implements OnInit {
  formBuilder = inject(UntypedFormBuilder);
  form: UntypedFormGroup = new FormGroup<any>({});

  get passwordFormControl(): FormControl {
    return this.form?.get('password') as FormControl;
  }

  /**
   * Initialize the form in this lifecycle hook
   */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue],
    });
  }
}
