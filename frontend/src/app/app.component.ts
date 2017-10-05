import { Component } from '@angular/core';
import { Card,
  GameMessage,
  CardType,
  GameEffect,
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
  player1Cards: Card[] = [];

  sendMessage(){
    console.log(this.message);
    this.socketService.send(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.socketService.initSocket();
    this.connection = this.socketService.onMessage().subscribe(message => {
      //console.log('message: ', message);
      this.messages.push(message);
      console.log(message.name);
      let actions = message.actions;
      for (let i = 0; i < actions.length; i++){
        console.log(actions[i].effect);
        if (actions[i].effect === GameEffect.Draw){
          this.player1Cards = this.player1Cards.concat(actions[i].card);
        }
      }
      
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
    this.player1Cards = [];
    let message: GameMessage = {
      name: "GameStart",
      actions: [],
      trigger: GameTrigger.GameStart
    }
    console.log(message);
    this.socketService.send(message);
  }
}

