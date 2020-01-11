import { Player, Zone, Id, UiPlayer } from '.';

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
