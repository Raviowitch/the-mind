import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';
import { GameService } from '../game.service';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
})
export class PlateauComponent implements OnInit {

  @Output() cardUsedEvent = new EventEmitter();
  @Output() endTurnEvent = new EventEmitter();

  public piles: Pile[];
  public cardSelected: Card | null;
  public cardsRemaining: number;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.nextCard$.subscribe(card => {
      this.cardSelected = card;
    });

    this.gameService.getBoard().subscribe(board => {
      this.cardsRemaining = board.cards.filter(card => !card.used).length;
      this.piles = board.piles;
    });
  }

  addCardToPile(pile: Pile) {
    if (this.cardSelected) {      
      if (pile.cards.length === 0) {
        this.addCard(pile);
      } else {
        const lastCardVisible: Card = pile.cards[pile.cards.length - 1];
        if (
          (pile.direction === 'UP' &&
          lastCardVisible.value < this.cardSelected.value) ||
          lastCardVisible.value === this.cardSelected.value + 10
        ) {
          this.addCard(pile);
        } else if (
          pile.direction === 'DOWN' &&
          (lastCardVisible.value > this.cardSelected.value ||
            lastCardVisible.value === this.cardSelected.value - 10)
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
    if (this.cardSelected) {      
      pile.cards.push(this.cardSelected);
      this.cardUsedEvent.emit(this.cardSelected);
      this.cardSelected = null;
    }
  }
}
