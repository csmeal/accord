import {
  GameAction,
  Player,
  GameTrigger,
  GameEffect,
  GameMessage,
  Deck,
  Card
} from './models';

export class GameHandler {
  players: Player[] = [];
  startingHandSize: number = 5;
  constructor() {}
  HandleAction(message: GameMessage): GameMessage {
    console.log('message is: ', message);
    let result: GameMessage;

    switch (message.trigger) {
      case GameTrigger.PlayCard: {
        let actions: GameAction[] = [];
        let cardToPlay = this.players[0].hand[message.sourceValue];
        console.log('playing card: ');
        console.log(cardToPlay);
        console.log(this.players[0].hand.length);
        console.log(message.sourceValue);
        if (cardToPlay !== undefined) {
          console.log('mana:', this.players[0].currentMana);
          if (cardToPlay.mana <= this.players[0].currentMana) {
            actions.push({
              destination: {
                player: 1
              },
              effect: GameEffect.AddAttribute,
              value: cardToPlay,
              attribute: 'creatures'
            });
            actions.push({
              destination: {
                player: 1
              },
              effect: GameEffect.SubtractAttribute,
              value: message.sourceValue,
              attribute: 'hand'
            });

            this.players[0].currentMana -= cardToPlay.mana;
            this.players[0].creatures.push(cardToPlay);
            this.players[0].hand.splice(message.sourceValue, 1);
          }
        }

        result = {
          name: 'Play creature',
          actions: actions,
          trigger: GameTrigger.PlayCard
        };

        break;
      }
      case GameTrigger.GameStart: {
        this.players = [];
        this.players.push(new Player(this.GeneratePlayer1Deck()));
        this.players.push(new Player(this.GeneratePlayer1Deck()));
        this.players[0].deck.availableList = this.players[0].deck.startingList;
        this.players[0].deck.shuffle();
        let actions: GameAction[] = [];
        for (let i: number = 0; i < this.startingHandSize; i++) {
          let card = this.players[0].deck.draw();
          this.players[0].hand.push(card);
          console.log('card to play:');
          console.log(card);
          actions.push(GameAction.createDrawEffect(1, card));
        }
        actions.push({
          destination: {
            player: 1
          },
          effect: GameEffect.SetAttribute,
          value: 33,
          attribute: 'health'
        });
        actions.push({
          destination: {
            player: 1
          },
          effect: GameEffect.SetAttribute,
          value: 3,
          attribute: 'maxMana'
        });

        actions.push({
          destination: {
            player: 1
          },
          effect: GameEffect.SetAttribute,
          value: 44,
          attribute: 'currentMana'
        });
        result = {
          name: 'Game Start',
          actions: actions,
          trigger: GameTrigger.GameStart
        };
        break;
      }
      case GameTrigger.EndTurn: {
        this.players[0].maxMana = this.players[0].maxMana + 1;
        this.players[0].currentMana = this.players[0].maxMana;
        let actions: GameAction[] = [];
        actions.push({
          destination: {
            player: 1
          },
          effect: GameEffect.AddAttribute,
          value: this.players[0].deck.draw(),
          attribute: 'hand'
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
          name: 'Turn Started',
          actions: actions,
          trigger: GameTrigger.EndTurn
        };
        break;
      }
    }
    console.log(result);
    return result;
  }

  GeneratePlayer1Deck(): Deck {
    return new Deck([
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
