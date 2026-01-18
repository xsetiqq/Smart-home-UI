import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface AddDashboardDialogData {
  existingIds: string[];
}
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-add-dashboard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './add-dashboard-dialog.component.html',
  styleUrl: './add-dashboard-dialog.component.scss',
})
export class AddDashboardDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AddDashboardDialogComponent>);
  private readonly data = inject<AddDashboardDialogData>(MAT_DIALOG_DATA);


  private uniqueIdValidator(control: AbstractControl): ValidationErrors | null {

    if (this.data.existingIds.includes(control.value)) {
      return { notUnique: true };
    }
    return null;
  }


  readonly form = this.formBuilder.group({
    id: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        (control: AbstractControl) => this.uniqueIdValidator(control),
      ],
    ],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    icon: ['dashboard', [Validators.required]], 
  });

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
