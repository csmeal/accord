import { Card } from './card';

export class Battlefield {
    creatures: Card[];
    public constructor(public maxCreatures: number){
        this.creatures = [];
    }
}