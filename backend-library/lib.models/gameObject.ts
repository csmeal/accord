import { Player } from './player';

export type Id = string;

export interface GameObject {
  name: string;
  id: Id;
  type: string;
}
