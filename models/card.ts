import { CardType } from "./cardType" 

export class Card{
    name: string;

    cardType: CardType;

    imageUrl: string;

    attack?: number;

    defense?: number;

    text: string;

    modifiers?: string[];
}