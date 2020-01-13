import { v4 as uuid } from 'uuid';

import { HearthstoneZone } from './zone';

import { Zone, Card, Id, Player } from '../../models';

export class HearthstonePlayer implements Player {
  deck: Zone;
  hand: Zone;
  graveyard: Zone;
  battlefield: HearthstoneZone;
  activeMana: number = 0;
  maxMana: number = 0;
  name: string;
  id: Id;
  life: number;
  active: boolean = true;

  constructor(name: string, cards: Card[]) {
    this.name = name;
    const deck = new Map<Id, Card>();
    cards.map(c => deck.set(c.id, c));
    this.deck = new HearthstoneZone(deck);
    this.life = 30;
    this.hand = new HearthstoneZone(null, 10);
    this.graveyard = new HearthstoneZone();
    this.battlefield = new HearthstoneZone(null, 5);
    this.id = uuid();
  }
}
