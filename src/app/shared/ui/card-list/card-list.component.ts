import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'app-card-list',
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  host: { class: 'card-list' },
})
export class CardListComponent {
  @Input()
  cards: Card[] = [];
}