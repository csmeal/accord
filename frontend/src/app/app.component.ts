import { Component } from '@angular/core';
import { 
  Card,
  Player,
  GameMessage,
  CardType,
  GameEffect,
  GameAttribute,
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
  players: Player[] = [];

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
      let actions: GameAction[] = message.actions;
      for (let i = 0; i < actions.length; i++){
        console.log(actions[i].effect);
        let action: GameAction = actions[i];
        if (action.effect === GameEffect.SetAttribute && action!.destination.player === 1){
          this.players[action.destination.player - 1][action.attribute] = action.value;
        }
        if (action.effect === GameEffect.AddAttribute){
          if (typeof action.value === 'number'){
            this.players[action.destination.player - 1][action.attribute] += action.value;
          } else {
            this.players[action.destination.player - 1][action.attribute].push(action.value);
          }
        }
    }
      
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  endTurn(){
    console.log('sss');
    let message: GameMessage = {
      name: "EndTurn",
      actions: [],
      trigger: GameTrigger.EndTurn,
      triggerSource: {
        player: 0
      }
    }
    console.log(message);
    this.socketService.send(message);
  }
  gameStart(){
    console.log('sdfsd');
    this.players = [new Player(null)];
    let message: GameMessage = {
      name: "GameStart",
      actions: [],
      trigger: GameTrigger.GameStart
    }
    console.log(message);
    this.socketService.send(message);
  }
}

