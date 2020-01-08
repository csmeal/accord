import { Game } from '.';

export interface Action {
  name: string;

  effect: (game: Game) => boolean;
}
