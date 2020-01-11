export interface Card {
  id: string;
  mana: number;
  type: string;
  imageUrl: string;
  text: string;
  name: string;
  activatedEffects;
}

export interface Creature extends Card {
  attack: number;
  defense: number;
  damageTaken: number;
}
