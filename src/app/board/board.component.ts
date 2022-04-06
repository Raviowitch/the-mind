import { Component, OnInit } from '@angular/core';
import { Board } from 'src/models/board.model';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: Board;
  public player1: Player;
  public player2: Player;
  public nextCard: Card;
  public actifPlayer: Player;
  constructor() {
    this.board = {
      cards: this.generateAllCards(),
      piles: this.generateAllPiles(),
    } as Board;
    this.player1 = {
      id: 'P1',
      name: 'Hélèna',
      cards: this.giveHand(),
    } as Player;
    this.player2 = {
      id: 'P2',
      name: 'Mathieu',
      cards: this.giveHand(),
    } as Player;

    this.actifPlayer = this.player1;
  }

  ngOnInit(): void {}

  generateAllCards() {
    var cards: Card[] = [];
    [...Array(104)].map((_, i) => {
      cards.push({ used: false, value: i + 1 } as Card);
    });
    return cards;
  }
  generateAllPiles() {
    var piles: Pile[] = [];
    [...Array(4)].map((_, i) => {
      if (i < 2) {
        piles.push({ direction: 'UP', cards: [] } as Pile);
      } else {
        piles.push({ direction: 'DOWN', cards: [] } as Pile);
      }
    });
    return piles;
  }

  giveHand() {
    const hand = [];
    for (let i = 0; i < 5; i++) {
      const cardsNotUsed = this.board.cards.filter((card) => !card.used);
      if (cardsNotUsed.length > 0) {
        const nextCard =
          cardsNotUsed[Math.floor(Math.random() * cardsNotUsed.length)];
        hand.push(nextCard);
        nextCard.used = true;
      }
    }
    return hand;
  }

  cardToUse(card: Card) {
    this.nextCard = card;
  }

  removeCard(card: Card) {
    const cardIndex = this.actifPlayer.cards.findIndex(
      (c) => c.value === card.value
    );
    this.actifPlayer.cards.splice(cardIndex, 1);
  }

  endTurn() {
    while (this.actifPlayer.cards.length < 5 || this.board.cards.filter((card) => !card.used).length === 0) {
      this.replaceCard();
    }
    this.changeActivePlayer();
  }

  replaceCard() {
    const cardsNotUsed = this.board.cards.filter((card) => !card.used);
    if (cardsNotUsed.length > 0) {
      const nextCard =
        cardsNotUsed[Math.floor(Math.random() * cardsNotUsed.length)];
      nextCard.used = true;
      this.actifPlayer.cards.push(nextCard);
    }
  }

  changeActivePlayer() {
    this.actifPlayer =
      this.actifPlayer === this.player1 ? this.player2 : this.player1;
  }
}
