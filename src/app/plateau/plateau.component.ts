import { Component, OnInit } from '@angular/core';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';
import { GameService } from '../game.service';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
})
export class PlateauComponent implements OnInit {
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

  endTurn() {
    this.gameService.endTurn();
  }

  removeCardFromHand(card: Card) {
    this.gameService.removeCard(card);
    this.cardSelected = null;
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

  private addCard(pile: Pile) {
    if (this.cardSelected) {      
      pile.cards.push(this.cardSelected);
      this.removeCardFromHand(this.cardSelected);
    }
  }
}
