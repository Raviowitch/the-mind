import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/models/card';
import { Player } from 'src/models/player';
import { GameService } from '../game.service';

@Component({
  selector: 'app-zone-jeu-joueur',
  templateUrl: './zone-jeu-joueur.component.html',
  styleUrls: ['./zone-jeu-joueur.component.scss'],
})
export class ZoneJeuJoueurComponent implements OnInit {
  @Input() player: Player | null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  selectCard(card: Card) {
    if (this.player?.isPlaying) {
      this.gameService.setCardSeleted(card);
    }
  }
}
