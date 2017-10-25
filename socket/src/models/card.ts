import { CardType } from "./cardType" 

export class Card{
    name: string;

    cardType: CardType;

    imageUrl: string;

    attack?: number;

    defense?: number;

    text: string;

    modifiers?: string[];

    mana: number;

    static card1(): Card{
        return { mana: 1, text: "When this card enters the battlefield he is very nice.", name: 'Mr. Nice', cardType: CardType.Action, attack: 0, defense: 0, imageUrl: "https://s3.amazonaws.com/accord-image-assets/stock-photo-mr-really-happy-guy-102486863.jpg" };
    }
    static card2(): Card{
        return { mana: 2, text: "While this card is in play, it is wednesday my dudes.", name: 'Creature Dude', cardType: CardType.Creature, attack: 2, defense: 3, imageUrl: "https://s3.amazonaws.com/accord-image-assets/it-is-wednesday-my-dudes-og.png" };
    }
    static card3(): Card{
        return { mana: 4, text: "Do 3 damage to target creature or player", name: 'Lightning Bolt', cardType: CardType.Action, imageUrl: "https://s3.amazonaws.com/accord-image-assets/stock-vector-lightning-bolt-icon-vector-521257918.jpg" };
    }
}