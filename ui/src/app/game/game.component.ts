import { Component, OnInit, Input } from '@angular/core';
import {
  HearthstoneGame,
  GenerateGame,
  HearthstonePlayer,
  Creature,
  range,
  GeneratePlayer
} from 'src/models';
import { SocketService } from '../socket.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: HearthstoneGame;
  player1: HearthstonePlayer;
  player2: HearthstonePlayer;
  display: boolean;

  constructor(private socketService: SocketService) {}

  private setGame(g) {
    console.log('received game');
    console.log(g);
    try {
      this.game = g;
      this.player1 = Array.from(this.game.players.values())[0];
      this.player2 = Array.from(this.game.players.values())[1];
      console.log(this.game);
    } catch (e) {
      console.log('error:');
      console.log(e);
    }
  }
  ngOnInit() {
    this.game = GenerateGame();
    this.player1 = GeneratePlayer();
    this.player2 = GeneratePlayer();
    this.socketService.onMessage().subscribe((m: any) => {
      this.setGame(m.data);
    });
    this.socketService.send({
      command: 'sg'
    });

    this.display = true;
  }
}
