import { Player, Zone, Id, Container } from '.';

export interface Game {
  name: string;

  players: Map<Id, Player>;

  hand: Zone;

  graveyard: Zone;

  deck: Zone;

  battlefield: Zone;
}
