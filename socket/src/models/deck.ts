import { Card } from './card';

export class Deck{
    startingList: Card[];
    availableList: Card[];
    nextFatigue: number;
    constructor(cards: Card[]){
        this.nextFatigue = 1;
        this.availableList = [];
        this.startingList = cards;
    }
    shuffle(): void{
        console.log('were shuffling now.');
        for(let i: number = 0; i < this.availableList.length;i++){
            let j = Math.floor(Math.random() * (this.availableList.length));
            let temp = this.availableList[i];
            this.availableList[i] = this.availableList[j];
            this.availableList[j] = temp;
        }
    }

    draw(): Card{
        return this.availableList.pop();
    }
}