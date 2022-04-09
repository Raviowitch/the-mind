import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/models/board.model';
import { Card } from 'src/models/card';
import { Pile } from 'src/models/pile';
import { Player } from 'src/models/player';
import { GameService } from '../game.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public player1$: Observable<Player> = new Observable();
  public player2$: Observable<Player> = new Observable();
  public actifPlayer$: Observable<Player>;

  constructor(private gameService: GameService) {
    this.player1$ = this.gameService.getPlayer1();
    this.player2$ = this.gameService.getPlayer2();
  }

  ngOnInit(): void {}

  cardToUse(card: Card) {
    this.gameService.setCardSeleted(card);
  }

  endTurn() {
    this.gameService.endTurn();
  }

  removeCard(card: Card) {
    this.gameService.removeCard(card);
  }
}
