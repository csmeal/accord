import { Card } from './card';

export class Deck{
    startingList: Card[];
    availableList: Card[];
    nextFatigue: number;
    Shuffle(): void{
        for(let i: number = this.availableList.length - 1; i < 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.availableList[i];
            this.availableList[i] = this.availableList[j];
            this.availableList[j] = temp;
        }
    }

    Draw(): Card{
        return this.availableList.pop();
    }
}