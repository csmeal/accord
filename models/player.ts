import { Hand } from './hand';
import { Battlefield } from './battlefield';
import { Deck } from './deck';

export class Player{
    hand: Hand;
    battlefield: Battlefield;
    maxMana: number;
    currentMana: number;
    deck: Deck;
}