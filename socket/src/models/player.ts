import { Hand } from './hand';
import { Battlefield } from './battlefield';
import { Deck } from './deck';
import { Card } from './card';

export class Player{
    hand: Card[];
    battlefield: Battlefield;
    creatures: Card[]
    maxMana: number;
    currentMana: number;
    health: number;

    MAX_CREATURE_COUNT: number = 5;
    constructor(public deck: Deck){
        this.maxMana = 0;
        this.health = 25;
        this.hand = [];
        this.creatures = [];
        this.battlefield = new Battlefield(this.MAX_CREATURE_COUNT);
    }
}