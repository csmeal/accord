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

  constructor(maxCards: number | null = null) {
    this.id = uuid();
    this.cards = new Map<string, Card>();
    this.effets = [];
    this.maxCards = maxCards;
  }
}

export class Deck extends Zone {
  constructor(cards: Map<string, Card>) {
    super(null);
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
  cards: Map<Id, Creature>;
}
