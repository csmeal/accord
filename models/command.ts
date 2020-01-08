import { Action, Game, Id } from '.';

// the base command class or interface
export interface Command {
  commandIsLegal: (game: Game) => boolean;
  handle: (game: Game) => Action[];
}
