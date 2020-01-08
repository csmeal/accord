import { Player, Zone, Id } from '.';

export interface Game {
  name: string;

  players: Map<Id, Player>;

  hand: Zone;

  graveyard: Zone;

  deck: Zone;

  battlefield: Zone;
}
