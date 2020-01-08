import { GameObject } from './gameObject';
import { v4 as uuid } from 'uuid';

export abstract class Card implements GameObject {
  name: string;
  id: string;
  mana: number;
  type: string;
  imageUrl: string =
    'http://conceptartworld.com/wp-content/uploads/2015/03/Magdalena_Radziej_Concept_Art_Illustration_fossil-soldier.jpg';
  text: string = 'You text here.';
  constructor(name: string, mana: number) {
    this.name = name;
    this.mana = mana;
    this.id = uuid();
  }
}

export class Creature extends Card {
  type = 'creature';
  attack: number;
  defense: number;
  damageTaken: number;

  constructor(name: string, mana: number, attack: number, defense: number) {
    super(name, mana);
    this.attack = attack;
    this.defense = defense;
    this.damageTaken = 0;
  }
}
