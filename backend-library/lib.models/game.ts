import { GameObject, Player } from '.';

export class Game implements GameObject {
  name: string;

  players: Player[];

  turnOrder = [0, 1];
}
