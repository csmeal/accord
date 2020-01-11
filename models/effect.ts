import { GameObject, Player } from '.';

export enum EffectType {
  static,
  activated,
  triggered
}

export interface Effect extends GameObject {
  effect: () => boolean;
}

export interface ActivatedEffect extends Effect {
  targets: [GameObject];
  type: 'ActivatedEffect';
}

export interface TriggeredEffect extends Effect {
  type: 'TriggeredEffect';
}

export interface StaticEffect extends Effect {
  type: 'StaticEffect';
}
