import { HearthstoneGame, MoveCard, Creature, HearthstonePlayer } from '.';
import {
  DrawCard,
  CreatureAttackCreature,
  SetMaxMana,
  SetActiveMana,
  SetPlayerActive,
  EndTurn
} from './action';
import { GetGameSummary } from './game';
import { Card, Action, Id, Game, Command } from '../../models';

// the base command class or interface

export class AttackCreatureCommand implements Command {
  attacker: Creature;
  defender: Creature;
  constructor(
    game: HearthstoneGame,
    playerId: Id,
    attackerId: Id,
    defenderId: Id
  ) {
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

export class EndTurnCommand implements Command {
  commandIsLegal = (game: HearthstoneGame): boolean => {
    console.log('ending turn for', this.playerId);
    console.log(Array.from(game.players.keys()));
    console.log(game.players.get(this.playerId).active);
    return !!game.players.get(this.playerId)?.active;
  };

  constructor(private playerId: Id) {}
  handle = (game: HearthstoneGame) => {
    const actions: Action[] = [];
    actions.push(new EndTurn(this.playerId));
    return actions;
  };
}

export class StartGameCommand implements Command {
  commandIsLegal = (game: HearthstoneGame): boolean => true;
  handle = (game: HearthstoneGame) => {
    console.log(game.players);
    const id1 = Array.from(game.players.values())[0].id;
    const id2 = Array.from(game.players.values())[1].id;
    const actions: Action[] = [
      new DrawCard(id1),
      new DrawCard(id1),
      new DrawCard(id1),
      new DrawCard(id2),
      new DrawCard(id2),
      new DrawCard(id2),
      new DrawCard(id2),
      new EndTurn(id2)
    ];

    return actions;
  };
}

export class PlayCreatureCommand implements Command {
  card: Card;
  player: HearthstonePlayer;
  commandIsLegal = (game: HearthstoneGame): boolean => {
    this.player = game.players.get(this.playerId);
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
  constructor(private playerId: Id, private cardId: Id) {}
}
