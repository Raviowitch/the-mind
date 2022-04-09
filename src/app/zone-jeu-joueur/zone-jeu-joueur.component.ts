import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/models/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Player } from 'src/models/player';


@Component({
  selector: 'app-zone-jeu-joueur',
  templateUrl: './zone-jeu-joueur.component.html',
  styleUrls: ['./zone-jeu-joueur.component.scss']
})
export class ZoneJeuJoueurComponent implements OnInit {

  @Input() player: Player | null;

  @Output() selectedCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectCard(card: Card) {
    if (this.player?.isPlaying) {      
      this.selectedCard.emit(card)
    }
  }
}
