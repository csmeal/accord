import { Zone } from '.';

export interface Player {
  id: string;
  name: string;
  life: number;
  hand: Zone;
  deck: Zone;
  battlefield: Zone;
  graveyard: Zone;
}
