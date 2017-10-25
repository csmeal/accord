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
    players: Player[] = [];
    startingHandSize: number= 5;
    constructor(){
        
    }
    HandleAction(message: GameMessage): GameMessage {
        console.log(message);
        let result: GameMessage;
        if (message.trigger === GameTrigger.PlayCard) {
            let actions: GameAction[] = [];
            let cardToPlay = this.players[0].hand[message.sourceValue];
            if (cardToPlay){
                if (cardToPlay.mana >= this.players[0].currentMana){
                    actions.push({
                        destination: {
                            player: 1
                        },
                        effect: GameEffect.AddAttribute,
                        value: cardToPlay,
                        attribute: 'battlefield'
                    });
                    actions.push({
                        destination: {
                            player: 1
                        },
                        effect: GameEffect.SubtractAttribute,
                        value: cardToPlay,
                        attribute: 'hand'
                    });
                }
            }
        }
        if (message.trigger === GameTrigger.GameStart){
            this.players.push(new Player(this.GeneratePlayer1Deck()));
            this.players.push(new Player(this.GeneratePlayer1Deck()));
            this.players[0].deck.availableList = this.players[0].deck.startingList;
            this.players[0].deck.shuffle();
            let actions: GameAction[] = [];
            for (let i: number = 0; i < this.startingHandSize;i++){
                actions = actions.concat({
                    destination: {
                        player: 1
                    },
                    effect: GameEffect.AddAttribute,
                    value: this.players[0].deck.draw(),
                    attribute: 'hand'
                });
            }
            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: 33,
                attribute: "health"
            });
            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: 3,
                attribute: "maxMana"
            });

            actions.push({
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
            this.players[0].maxMana = this.players[0].maxMana + 1;
            this.players[0].currentMana = this.players[0].maxMana;
            let actions: GameAction[] = [];
            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.AddAttribute,
                value: this.players[0].deck.draw(),
                attribute: "hand"
            });

            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: this.players[0].currentMana,
                attribute: 'currentMana'
            });

            actions.push({
                destination: {
                    player: 1
                },
                effect: GameEffect.SetAttribute,
                value: this.players[0].maxMana,
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