import { GameAction, Player, GameTrigger, GameMessage } from "../../models";

export class GameHandler {
    player1: Player;
    player2: Player;
    startingHandSize: number= 5;

    HandleAction(message: GameMessage): GameMessage {
        let result: GameMessage;
        if (message.trigger === GameTrigger.GameStart){
            this.player1.deck.availableList = this.player1.deck.startingList;
            this.player1.deck.Shuffle();
            result.name = "Draw starting hand";
            result.trigger = GameTrigger.GameStart;
            for (let i: number = 0; i < this.startingHandSize;i++){
                result.actions.concat({
                    source: {
                        player: 1
                    },
                    card: this.player1.deck.Draw()
                })
            }
            

        }
        return result;
    }
}