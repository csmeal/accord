import { Player, HearthstonePlayer, Card, Id } from '.';
import { Zone } from './zone';
import { HearthstoneGame } from './game';
import { Creature } from './card';

export interface ActionTarget {
  playerId: Id;
  objectId: Id;
}

export class DamageCreature implements Action {
  name = 'doDamage';
  creature: Creature;
  damage: number;
  constructor(game: HearthstoneGame, createreId: Id, damage: number) {
    game.players.forEach(p => {
      if (p.battlefield.cards.has(createreId)) {
        this.creature = p.battlefield.cards.get(createreId) as Creature;
        this.damage = damage;
      }
    });
  }

  effect = (game: HearthstoneGame) => this.doDamage();
  doDamage = (): boolean => {
    this.creature.damageTaken += this.damage;
    return true;
  };
}

export class CreatureAttackCreature implements Action {
  name: 'creatureAttackCreature';
  source: Creature;
  dest: Creature;
  game: HearthstoneGame;

  constructor(game: HearthstoneGame, sourceId: Id, destId: Id) {
    this.game = game;
    console.log(sourceId);
    this.source = game.getCreatureOnBattlefield(sourceId);
    this.dest = game.getCreatureOnBattlefield(destId);
    console.log(this.source.name);
  }

  effect = (game: HearthstoneGame) => this.trade();

  trade = (): boolean => {
    new DamageCreature(this.game, this.source.id, this.dest.attack).effect(
      this.game
    );
    new DamageCreature(this.game, this.dest.id, this.source.attack).effect(
      this.game
    );
    return true;
  };
}

export interface Action {
  name: string;

  effect: (game: HearthstoneGame) => boolean;
}

export class MoveCard implements Action {
  name: 'moveCard';
  card: Card;
  source: Zone;
  dest: Zone;

  constructor(card: Card, source: Zone, dest: Zone) {
    this.card = card;
    this.source = source;
    this.dest = dest;
  }

  effect = game => this.moveCard();
  moveCard = (): boolean => {
    if (this.source.cards.has(this.card.id)) {
      this.source.cards.delete(this.card.id);
      this.dest.cards.set(this.card.id, this.card);

      return true;
    }

    return false;
  };
}

export class DrawCard implements Action {
  name: 'drawCard';
  playerId: Id;

  constructor(playerId: Id) {
    this.playerId = playerId;
  }

  effect = (game: HearthstoneGame) => {
    console.log('drawing card');
    const player = game.players.get(this.playerId);
    if (player.deck.cards.size <= 0) {
      console.log('deck has no cards');
      return false;
    }

    const drawnCard = Array.from(player.deck.cards.values())[0];
    player.deck.cards.delete(drawnCard.id);
    if (player.hand.cards.size === player.hand.maxCards) {
      player.graveyard.cards.set(drawnCard.id, drawnCard);
    } else {
      player.hand.cards.set(drawnCard.id, drawnCard);
    }
    return true;
  };
}
