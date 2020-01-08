import { GameObject, Player, Effect } from '.';
import { Card } from './card';
import { Id } from './gameObject';

export interface Zone {
  id: string;
  type: string;
  maxCards: number | null;
  effects: Effect[];
  cards: Map<string, Card>;
}
