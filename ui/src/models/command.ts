import {
  Player,
  Card,
  Game,
  HearthstoneGame,
  Action,
  MoveCard,
  Creature,
  HearthstonePlayer,
  Id
} from '.';
import { DrawCard, CreatureAttackCreature } from './action';
import { GetGameSummary } from './game';

// the base command class or interface
export abstract class Command {
  playerIndex: Id;
  constructor(playerIndex: Id) {
    this.playerIndex = playerIndex;
  }
  abstract commandIsLegal: (game: Game) => boolean;
  abstract handle: (game: Game) => Action[];
}

export class AttackCreatureCommand extends Command {
  attacker: Creature;
  defender: Creature;
  constructor(
    game: HearthstoneGame,
    playerId: Id,
    attackerId: Id,
    defenderId: Id
  ) {
    super(playerId);
    const player = game.players.get(playerId);
    let player2;
    Array.from(game.players.keys()).forEach(element => {
      if (playerId !== element) {
        player2 = game.players.get(element);
      }
    });
    console.log(attackerId);
    console.log(defenderId);
    this.attacker = player.battlefield.cards.get(attackerId) as Creature;
    this.defender = player2.battlefield.cards.get(defenderId) as Creature;

    console.log(this.attacker);
    console.log(this.defender);
  }

  commandIsLegal = (game: HearthstoneGame): boolean => {
    return true;
  };

  handle = (game: HearthstoneGame) => {
    return [
      new CreatureAttackCreature(game, this.attacker.id, this.defender.id)
    ];
  };
}

export class StartGameCommand extends Command {
  game: HearthstoneGame;

  commandIsLegal = (game: HearthstoneGame): boolean => true;
  handle = (game: HearthstoneGame) => {
    const id1 = Array.from(game.players.values())[0].id;
    const id2 = Array.from(game.players.values())[1].id;
    const actions: Action[] = [
      new DrawCard(id1),
      new DrawCard(id1),
      new DrawCard(id1),
      new DrawCard(id2),
      new DrawCard(id2),
      new DrawCard(id2),
      new DrawCard(id2)
    ];

    return actions;
  };
}

export class PlayCreatureCommand extends Command {
  card: Card;
  cardId: string;
  player: HearthstonePlayer;
  commandIsLegal = (game: HearthstoneGame): boolean => {
    this.player = game.players.get(this.playerIndex);
    this.card = this.player.hand.cards.get(this.cardId);
    if (
      !this.card ||
      this.player.activeMana < this.card.mana ||
      this.player.battlefield.cards.size >= this.player.battlefield.maxCards
    ) {
      return false;
    }

    return true;
  };

  handle = (game: HearthstoneGame) => {
    const move = new MoveCard(
      this.card,
      this.player.hand,
      this.player.battlefield
    );
    return [move];
  };
  constructor(playerId: Id, cardId: Id) {
    super(playerId);
    this.cardId = cardId;
  }
}
