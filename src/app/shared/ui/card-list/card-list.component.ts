import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  host: { class: 'card-list' },
})
export class CardListComponent {
  @Input() cards: Card[] = [];
}
