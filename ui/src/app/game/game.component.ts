import { Component, OnInit, Input } from '@angular/core';
import {
  HearthstoneGame,
  GenerateGame,
  HearthstonePlayer,
  Creature,
  range,
  GeneratePlayer,
  UiGame,
  ConvertGameToUi,
  Game
} from 'src/models';
import { SocketService } from '../socket.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: UiGame;
  player1: HearthstonePlayer;
  player2: HearthstonePlayer;
  display: boolean;

  constructor(private socketService: SocketService) {}

  private setGame(g) {
    // console.log('received game');
    try {
      this.player1 = g.players[0];
      this.player2 = g.players[1];
      // console.log(this.game);
    } catch (e) {
      console.log('error:');
      console.log(e);
    }
  }

  ngOnInit() {
    this.game = ConvertGameToUi(GenerateGame() as any);
    this.player1 = GeneratePlayer();
    this.player2 = GeneratePlayer();
    this.socketService.onMessage().subscribe((m: any) => {
      console.log('m: ', m);
      this.setGame(m.data);
    });
    this.socketService.send({
      command: 'sg'
    });

    this.display = true;
  }
}
