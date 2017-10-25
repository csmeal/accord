import { Card, Player } from "../../../../models"
import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
  })
  export class GameBoardComponent {
    @Input() players: Player[];

    
    
  }