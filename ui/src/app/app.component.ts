import { Component, OnInit } from '@angular/core';
import {
  Card,
  Creature,
  Zone,
  GeneratePlayer,
  HearthstonePlayer,
  HearthstoneGame,
  Game
} from '../models';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';
  game: HearthstoneGame;
  hand: Zone;
  connection;
  constructor(private socketService: SocketService) {}

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  ngOnInit() {
    this.socketService.initSocket();
    this.connection = this.socketService.onMessage().subscribe(this.onMessage);
    this.socketService.send('wait,,,');
  }

  onMessage(message: any) {
    // console.log(message);
    if (message.data) {
      console.log('setting game ');
      this.game = message.data;
    }
    console.log(this.game);
  }
}
