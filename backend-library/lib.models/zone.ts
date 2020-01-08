import { v4 as uuid } from 'uuid';
import { Id, Card, Effect, Zone } from '../../models';

export class HearthstoneZone implements Zone {
  id: Id;
  cards: Map<string, Card>;
  maxCards: number;
  effects: Effect[];
  type: string;

  constructor(map: Map<string, Card> = null, maxCards: number | null = null) {
    this.id = uuid();
    this.cards = map || new Map<string, Card>();
    this.effects = [];
    this.maxCards = maxCards;
  }
}
