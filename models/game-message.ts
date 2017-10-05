import { GameAction, GameTrigger, GameEntity } from '.';


export class GameMessage {
    name: string;
    actions: GameAction[];
    trigger: GameTrigger;
    triggerSource?: GameEntity;
}