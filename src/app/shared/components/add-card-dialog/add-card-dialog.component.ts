import { Component } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-card-dialog',
  imports: [MatDialogClose, MatIcon],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss',
})
export class AddCardDialogComponent {
}
  