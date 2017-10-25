import { Hand } from './hand';
import { Battlefield } from './battlefield';
import { Deck } from './deck';
import { Card } from './card';

export class Player{
    hand: Card[];
    battlefield: Battlefield;
    createures: Card[]
    maxMana: number;
    currentMana: number;
    health: number;

    MAX_CREATURE_COUNT: number = 5;
    constructor(public deck: Deck){
        this.maxMana = 0;
        this.health = 25;
        this.hand = [];
        this.battlefield = new Battlefield(this.MAX_CREATURE_COUNT);
    }
}