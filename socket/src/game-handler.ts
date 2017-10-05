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
                    source: {
                        player: 1
                    },
                    effect: GameEffect.Draw,
                    card: this.player1.deck.draw()
                });
            }
            result = {
                name: "Game Start",
                actions: actions,
                trigger: GameTrigger.GameStart
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