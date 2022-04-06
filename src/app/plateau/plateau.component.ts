import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
})
export class PlateauComponent implements OnInit {
  @Input() piles: Pile[];
  @Input() nextMove: Card | null;
  @Output() cardUsedEvent = new EventEmitter();
  @Output() endTurnEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addCardToPile(pile: Pile) {
    if (this.nextMove) {
      if (pile.cards.length === 0) {
        this.addCard(pile);
      } else {
        const lastCardVisible: Card = pile.cards[pile.cards.length - 1];
        if (
          (pile.direction === 'UP' &&
          lastCardVisible.value < this.nextMove.value) ||
          lastCardVisible.value === this.nextMove.value + 10
        ) {
          this.addCard(pile);
        } else if (
          pile.direction === 'DOWN' &&
          (lastCardVisible.value > this.nextMove.value ||
            lastCardVisible.value === this.nextMove.value - 10)
        ) {
          this.addCard(pile);
        }
      } 
    }
  }

  endTurn() {
    this.endTurnEvent.emit(true);
  }

  private addCard(pile: Pile) {
    if (this.nextMove) {
      pile.cards.push(this.nextMove);
      this.cardUsedEvent.emit(this.nextMove);
      this.nextMove = null;
    }
  }
}
