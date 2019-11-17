import { GameObject, Cost } from '.';

export enum EffectType {
  static,
  activated,
  triggered
}

export class Effect implements GameObject {
  name: string;

  effectType: EffectType;

  owener: GameObject;
}

export class ActivatedAbility extends Effect {
  cost: [Cost];
}
