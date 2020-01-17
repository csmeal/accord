import { Id } from './gameObject';
import { Game, Action, Command } from '.';
import { Player } from './player';

export enum CostType {
  mana,
  energy
}

export enum PlayerZone {
  graveyard,
  hand,
  battlefield
}

export interface Ability {
  name: string;
  cost: Cost[];

  validTargets: (g: Game, p: Player) => boolean | Target[];
  usableZone: PlayerZone[];
  dewit: (deets: any) => Command;
}

export interface Cost {
  resource: CostType;
  count: number;
}

export enum TargetType {
  player,
  creature
}

export enum FriendlyType {
  friendly,
  enemy,
  neutral
}

export interface Target {
  target: TargetType;
  id: Id;
  enemy: FriendlyType;
}
export interface Card {
  id: string;
  mana: number;
  type: string;
  imageUrl: string;
  text: string;
  name: string;
  abilities: Ability[];
}

export interface Creature extends Card {
  attack: number;
  defense: number;
  damageTaken: number;
}
