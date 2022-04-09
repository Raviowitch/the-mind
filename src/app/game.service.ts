import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, take } from 'rxjs';
import { Board } from 'src/models/board.model';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly CARD_TO_PLAY_BY_TURN = 2;
  readonly CARD_BY_HAND = 5;

  public board$ = new BehaviorSubject<Board>({
    cards: this.generateAllCards(),
    piles: this.generateAllPiles(),
  });
  public nextCard$ = new BehaviorSubject<Card | null>(null);
  private player1$ = new BehaviorSubject<Player>({
    id: 'P1',
    name: 'Hélèna',
    cards: this.giveHand(),
    cardUsedInLastTurn: 0,
    isPlaying: true,
  });
  private player2$ = new BehaviorSubject<Player>({
    id: 'P2',
    name: 'Mathieu',
    cards: this.giveHand(),
    cardUsedInLastTurn: 0,
    isPlaying: false,
  });

  constructor() {}

  getPlayer1() {
    return this.player1$.asObservable();
  }

  setPlayer1(value: Player) {
    this.player1$.next(value);
  }

  getPlayer2() {
    return this.player2$.asObservable();
  }

  setPlayer2(value: Player) {
    this.player2$.next(value);
  }

  getCardSeleted() {
    return this.nextCard$.asObservable();
  }

  setCardSeleted(value: Card) {
    this.nextCard$.next(value);
  }

  getBoard() {
    return this.board$.asObservable();
  }

  setBoard(value: Board) {
    this.board$.next(value);
  }

  endTurn() {
    if (this.player1$.getValue().isPlaying) {
      this.refillHandAndChangePlayer(this.player1$.getValue());
    }
    if (this.player2$.getValue().isPlaying) {
      this.refillHandAndChangePlayer(this.player2$.getValue());
    }
  }

  replaceCard(player: Player) {
    const cardsNotUsed = this.board$
      .getValue()
      .cards.filter((card) => !card.used);
    if (cardsNotUsed.length > 0) {
      const nextCard =
        cardsNotUsed[Math.floor(Math.random() * cardsNotUsed.length)];
      nextCard.used = true;
      player.cards.push(nextCard);
    }
  }

  giveHand() {
    const hand = [];
    for (let i = 0; i < this.CARD_BY_HAND; i++) {
      const cardsNotUsed = this.board$
        .getValue()
        .cards.filter((card) => !card.used);
      if (cardsNotUsed.length > 0) {
        const nextCard =
          cardsNotUsed[Math.floor(Math.random() * cardsNotUsed.length)];
        hand.push(nextCard);
        nextCard.used = true;
      }
    }
    return hand;
  }

  removeCard(card: Card) {
    if (this.player1$.getValue().isPlaying) {
      this.removeCardFromHandPlayer(this.player1$.getValue(), card);
    }
    if (this.player2$.getValue().isPlaying) {
      this.removeCardFromHandPlayer(this.player2$.getValue(), card);
    }
  }

  changeActivePlayer() {
    this.getPlayer1()
      .pipe(take(1))
      .subscribe((player) => {
        player.cardUsedInLastTurn = 0;
        player.isPlaying = !player.isPlaying;
      });

    this.getPlayer2()
      .pipe(take(1))
      .subscribe((player) => {
        player.cardUsedInLastTurn = 0;
        player.isPlaying = !player.isPlaying;
      });
  }

  private generateAllCards() {
    var cards: Card[] = [];
    [...Array(104)].map((_, i) => {
      cards.push({ used: false, value: i + 1 } as Card);
    });
    return cards;
  }

  private generateAllPiles() {
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

  private refillHandAndChangePlayer(player: Player) {
    if (
      player.isPlaying &&
      player.cardUsedInLastTurn >= this.CARD_TO_PLAY_BY_TURN
    ) {
      while (
        player.cards.length < this.CARD_BY_HAND ||
        this.board$.getValue().cards.filter((card) => !card.used).length === 0
      ) {
        this.replaceCard(player);
      }
      this.changeActivePlayer();
      this.setBoard(this.board$.getValue());
    }
  }

  private removeCardFromHandPlayer(player: Player, card: Card) {
    if (player.isPlaying) {
      const cardIndex = player.cards.findIndex((c) => c.value === card.value);
      player.cards.splice(cardIndex, 1);
      player.cardUsedInLastTurn++;
    }
  }
}
