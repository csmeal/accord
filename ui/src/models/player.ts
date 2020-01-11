import { GameObject, Zone } from '.';
import { v4 as uuid } from 'uuid';
import { Id, Card } from '.';
import { Deck, BattleField, UiZone } from './zone';
export abstract class Player implements GameObject {
  id: string;
  type = 'player';
  name: string;
  owner: null;
  life: number;
  hand: Zone;
  graveyard: Zone;
  battlefield: Zone;
  deck: Zone;
  effects: any[];
  activeMana: number;
  maxMana: number;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}

export interface UiPlayer {
  id: string;
  name: string;
  life: number;
  hand: UiZone;
  deck: UiZone;
  battlefield: UiZone;
  graveyard: UiZone;
  activeMana: number;
  maxMana: number;
}

export class HearthstonePlayer extends Player {
  deck: Zone;
  hand: Zone;
  graveyard: Zone;
  battlefield: BattleField;
  activeMana: number;
  maxMana: number;

  constructor(name: string, cards: Card[]) {
    super(name);
    const deck = new Map<Id, Card>();
    cards.map(c => deck.set(c.id, c));
    this.deck = new Deck(deck);
    this.life = 30;
    this.hand = new Zone(10, 'hand');
    this.graveyard = new Zone(null, 'graveyard');
    this.battlefield = new BattleField(5);
  }
}
