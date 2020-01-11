import { Zone, UiZone } from '.';

export interface Player {
  id: string;
  name: string;
  life: number;
  hand: Zone;
  deck: Zone;
  battlefield: Zone;
  graveyard: Zone;
}

export interface UiPlayer {
  id: string;
  name: string;
  life: number;
  hand: UiZone;
  deck: UiZone;
  battlefield: UiZone;
  graveyard: UiZone;
}
