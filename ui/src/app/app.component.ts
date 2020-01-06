import { Component, OnInit } from '@angular/core';
import {
  Card,
  Creature,
  Zone,
  GeneratePlayer,
  HearthstonePlayer
} from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';
  hand: Zone;
  constructor() {
    const p = GeneratePlayer('test') as HearthstonePlayer;

    const creatures = [
      new Creature('Test Name', 1, 2, 3),
      new Creature('Test Name', 1, 2, 3),
      new Creature('Test Name', 1, 2, 3)
    ];
    creatures.map(c => p.hand.cards.set(c.id, c));
    this.hand = p.hand;
  }

  ngOnInit() {}
}
