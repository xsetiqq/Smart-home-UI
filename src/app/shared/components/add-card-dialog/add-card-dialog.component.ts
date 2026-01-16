import { Component, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card.model';
import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-card-dialog',
  imports: [MatDialogClose, MatIcon],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss',
})
export class AddCardDialogComponent {
  data = inject(MAT_DIALOG_DATA);

}
