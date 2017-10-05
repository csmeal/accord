import { Component } from '@angular/core';
import { Card,
  GameMessage,
  CardType,
  GameAction,
  GameEntity,
  GameTrigger
 } from '../../../models/';

import { FormsModule } from '@angular/forms';
import { SocketService } from "./socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent {

  constructor(private socketService: SocketService){}

  messages = [];
  connection;
  message;

  title = 'Accord';
  CARDS: Card[] = [
    { text: "When this card enters the battlefield he is very nice.", name: 'Mr. Nice', cardType: CardType.Action, attack: 0, defense: 0, imageUrl: "https://s3.amazonaws.com/accord-image-assets/stock-photo-mr-really-happy-guy-102486863.jpg" },
    { text: "While this card is in play, it is wednesday my dudes.", name: 'Creature Dude', cardType: CardType.Creature, attack: 2, defense: 3, imageUrl: "https://s3.amazonaws.com/accord-image-assets/it-is-wednesday-my-dudes-og.png" },
    { text: "Do 3 damage to target creature or player", name: 'Lightning Bolt', cardType: CardType.Action, imageUrl: "https://s3.amazonaws.com/accord-image-assets/stock-vector-lightning-bolt-icon-vector-521257918.jpg" }
  ];

  sendMessage(){
    console.log(this.message);
    this.socketService.send(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.socketService.initSocket();
    this.connection = this.socketService.onMessage().subscribe(message => {
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  endTurn(){
    console.log('sss');
  }
  gameStart(){
    console.log('sdfsd');
    let message: GameMessage = {
      name: "GameStart",
      actions: [],
      trigger: GameTrigger.GameStart
    }
    console.log(message);
    this.socketService.send(message);
  }
}

