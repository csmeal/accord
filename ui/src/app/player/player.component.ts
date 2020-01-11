import { Component, OnInit, Input } from '@angular/core';
import { HearthstoneGame, HearthstonePlayer, UiPlayer } from 'src/models';
import { SocketService } from '../socket.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: UiPlayer;
  constructor(private socketService: SocketService) {}
  endTurn() {
    console.log(this.player.id);
    this.socketService.send({
      command: 'et',
      playerId: this.player.id
    });
  }
  ngOnInit() {}
}
