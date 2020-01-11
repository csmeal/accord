import { Player, Zone, HearthstonePlayer, Action, Id, UiPlayer } from '.';
import { Command } from './command';
import { Deck, HearthstoneDeck } from './zone';

import { Creature, Card } from './card';
import { MoveCard } from './action';

export interface Game {
  name: string;

  players: Map<Id, Player>;

  zones: Zone[];

  turnOrder: number[];
}

export interface Game {
  name: string;

  players: Map<Id, Player>;
}

export const ConvertGameToUi = (game: Game): UiGame => {
  return {
    name: game.name,
    players: Array.from(game.players.values()).map(p => {
      return {
        ...p,
        hand: {
          ...p.hand,
          cards: Array.from(p.hand.cards.values())
        },
        battlefield: {
          ...p.battlefield,
          cards: Array.from(p.battlefield.cards.values())
        },
        deck: {
          ...p.deck,
          cards: Array.from(p.battlefield.cards.values())
        },
        graveyard: {
          ...p.graveyard,
          cards: Array.from(p.graveyard.cards.values())
        }
      };
    })
  };
};

export interface UiGame {
  name: string;

  players: UiPlayer[];
}

export class HearthstoneGame implements Game {
  name: 'hearthstone';

  constructor(player1: HearthstonePlayer, player2: HearthstonePlayer) {
    this.players = new Map<Id, HearthstonePlayer>();
    this.players.set(player1.id, player1);
    this.players.set(player2.id, player2);
    this.actionQueue = [];
  }

  actionQueue: Action[];

  players: Map<Id, HearthstonePlayer>;

  zones: Zone[];

  turnOrder = [0, 1];

  getCreatureOnBattlefield: (Id) => Creature = (id: Id) => {
    const p = Array.from(this.players.values());
    const thing = Array.from(p.map(s => s.battlefield));
    let result = null;
    thing.forEach(t => {
      if (t.cards.has(id)) {
        result = t.cards.get(id);
      }
    });

    return result;
    // const bf = new Map([...thing2]);
  };

  checkRules = () => {
    this.checkForDeadCreatures();
  };

  checkForDeadCreatures = () => {
    console.log('checking for dead creatures');
    this.players.forEach(p => {
      p.battlefield.cards.forEach((c: Creature) => {
        if (c.defense - c.damageTaken <= 0) {
          console.log('found a dead one');
          new MoveCard(c, p.battlefield, p.graveyard).effect(this);
        }
      });
    });
  };

  flushQueue = (actions: Action[]) => {
    actions.map(a => a.effect(this));
    this.checkRules();
  };
}

export function range(end, start = 1) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

export const GenerateGame: () => HearthstoneGame = () =>
  new HearthstoneGame(GeneratePlayer('test1'), GeneratePlayer('test2'));

export const GeneratePlayer = (name = 'test1'): HearthstonePlayer =>
  new HearthstonePlayer(
    name,
    range(30).map(n => new Creature(`Card ${n.toString()}`, n, n, n))
  );

export const GetGameSummary = (game: HearthstoneGame) => {
  let result = `\tDeck\tHand\tBF\tGY\n`;
  game.players.forEach(
    p =>
      (result += `${p.name}\t${p.deck.cards.size}\t${p.hand.cards.size}\t${p.battlefield.cards.size}\t${p.graveyard.cards.size}\n`)
  );
  return result;
};
