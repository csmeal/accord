import {
    GameAction,
    Player,
    GameTrigger,
    GameEffect,
    GameMessage,
    Deck,
    Card
} from "./models";

export class GameHandler {
    player1: Player;
    player2: Player;
    startingHandSize: number= 5;
    constructor(){
        
    }
    HandleAction(message: GameMessage): GameMessage {
        console.log(message);
        let result: GameMessage;
        if (message.trigger === GameTrigger.GameStart){
            this.player1 = new Player(this.GeneratePlayer1Deck());
            this.player2 = new Player(this.GeneratePlayer1Deck());
            this.player1.deck.availableList = this.player1.deck.startingList;
            this.player1.deck.shuffle();
            let actions: GameAction[] = [];
            for (let i: number = 0; i < this.startingHandSize;i++){
                actions = actions.concat({
                    destination: {
                        player: 1
                    },
                    effect: GameEffect.AddAttribute,
                    value: this.player1.deck.draw(),
                    attribute: 'hand'
                });
            }
            actions = actions.concat({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: 33,
                attribute: "health"
            });
            actions = actions.concat({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: 3,
                attribute: "maxMana"
            });

            actions = actions.concat({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: 44,
                attribute: "currentMana"
            });
            result = {
                name: "Game Start",
                actions: actions,
                trigger: GameTrigger.GameStart
            }

        } else if (message.trigger === GameTrigger.EndTurn){
            this.player1.maxMana = this.player1.maxMana + 1;
            this.player1.currentMana = this.player1.maxMana;
            let actions: GameAction[] = [];
            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.AddAttribute,
                value: this.player1.deck.draw(),
                attribute: "hand"
            });

            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: this.player1.currentMana,
                attribute: 'currentMana'
            });

            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: this.player1.maxMana,
                attribute: 'maxMana'
            });

            result = {
                name: "Turn Started",
                actions: actions,
                trigger: GameTrigger.EndTurn
            }
        }
        console.log(result);
        return result;
    }
    
    GeneratePlayer1Deck(): Deck {return new Deck([
            Card.card1(),
            Card.card1(),
            Card.card1(),
            Card.card1(),
            Card.card2(),
            Card.card2(),
            Card.card2(),
            Card.card2(),
            Card.card3(),
            Card.card3(),
            Card.card3(),
            Card.card3()
        ]);
    }
}