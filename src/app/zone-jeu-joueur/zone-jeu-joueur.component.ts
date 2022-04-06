import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/models/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-zone-jeu-joueur',
  templateUrl: './zone-jeu-joueur.component.html',
  styleUrls: ['./zone-jeu-joueur.component.scss']
})
export class ZoneJeuJoueurComponent implements OnInit {

  @Input() cards: Card[];
  @Input() disabled: boolean;

  @Output() selectedCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectCard(card: Card) {
    if (!this.disabled) {
      this.selectedCard.emit(card)
    }
  }
}
