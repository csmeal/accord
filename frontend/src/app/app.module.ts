import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardComponent } from "../components/card/card.component"
import { HandComponent } from "../components/hand/hand.component"
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

import { MdCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
