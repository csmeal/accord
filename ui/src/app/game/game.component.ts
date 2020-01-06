import { Component, OnInit } from '@angular/core';
import {
  HearthstoneGame,
  GenerateGame,
  HearthstonePlayer,
  Creature,
  range
} from 'src/models';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: HearthstoneGame;
  player1: HearthstonePlayer;
  player2: HearthstonePlayer;

  constructor() {}

  ngOnInit() {
    this.game = GenerateGame();
    this.player1 = Array.from(this.game.players.values())[0];
    this.player2 = Array.from(this.game.players.values())[1];

    [this.player1, this.player2].map(p =>
      range(3).map(n => {
        [p.battlefield, p.graveyard, p.hand].map(z => {
          const card = new Creature(`test ${z.type}${n.toString()}`, n, n, n);
          z.cards.set(card.id, card);
        });
      })
    );
  }
}
