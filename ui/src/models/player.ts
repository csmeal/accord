import { GameObject, Zone } from '.';
import { v4 as uuid } from 'uuid';
import { Id, Card } from '.';
import { Deck, BattleField } from './zone';
export abstract class Player implements GameObject {
  id: string;
  type = 'player';
  name: string;
  owner: null;
  zones: Zone[];
  life: number;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
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
