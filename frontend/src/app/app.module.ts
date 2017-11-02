import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardComponent } from "../components/card/card.component"
import { HandComponent } from "../components/hand/hand.component"
import { PlayerComponent } from "../components/player/player.component";
import { BattlefieldComponent } from "../components/battlefield/battlefield.component"
import { GameBoardComponent } from "../components/gameboard/game-board.component";
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HandComponent,
    PlayerComponent,
    BattlefieldComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
