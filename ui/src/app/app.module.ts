import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HandComponent } from './hand/hand.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [AppComponent, CardComponent, HandComponent, BattlefieldComponent, GraveyardComponent, GameComponent, PlayerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
