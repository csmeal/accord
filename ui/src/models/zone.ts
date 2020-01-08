import { GameObject, Player, Effect } from '.';
import { v4 as uuid } from 'uuid';
import { Card, Creature } from './card';
import { Id } from './gameObject';

export class Zone {
  id: string;
  type: string;
  maxCards: number | null;
  effets: Effect[];
  cards: Map<string, Card>;

  constructor(maxCards: number | null = null, type: string = 'unknown') {
    this.id = uuid();
    this.cards = new Map<string, Card>();
    this.effets = [];
    this.maxCards = maxCards;
    this.type = type;
  }
}

export class Deck extends Zone {
  constructor(cards: Map<string, Card>) {
    super(null, 'deck');
    this.cards = cards;
  }
}

export class HearthstoneDeck extends Deck {
  constructor(cards: Card[]) {
    const result = new Map<Id, Card>();
    cards.map(card => result.set(card.id, card));

    super(result);
  }
}

export class BattleField extends Zone {
  constructor(max: number = 7) {
    super(7, 'battlefield');
  }
  cards: Map<Id, Creature>;
}
