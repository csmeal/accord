import { v4 as uuid } from 'uuid';
import { Card, Ability } from '../../models';

export abstract class BaseCard implements Card {
  id: string;
  type: string;
  imageUrl: string =
    'http://conceptartworld.com/wp-content/uploads/2015/03/Magdalena_Radziej_Concept_Art_Illustration_fossil-soldier.jpg';
  text: string = 'You text here.';
  activatedEffects: Ability[];
  constructor(public name: string, public mana: number) {
    this.id = uuid();
  }
}

export class Creature extends BaseCard {
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
