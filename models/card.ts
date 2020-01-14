import { Id } from './gameObject';
import { Game, Action } from '.';

export enum CostType {
  mana,
  energy
}

export interface Ability {
  name: string;
  cost: Cost[];
  validTargets:  Target[];
  execute: (game: Game) => Action[]
}

export interface Cost {
  resource: CostType;
  count: number;
}

export enum TargetType {
  player,
  creature
}

export interface Target {
  type: TargetType,
  id: Id
}
export interface Card {
  id: string;
  mana: number;
  type: string;
  imageUrl: string;
  text: string;
  name: string;
}


export interface UiCard extends Card{
abilities: 
}
export interface Creature extends Card {
  attack: number;
  defense: number;
  damageTaken: number;
}
