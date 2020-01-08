import { Command } from './command';

export interface Controller{ 
  dispatch(command: Command);
}