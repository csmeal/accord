import { GameEffect,
    Card,
    GameAttribute,
    GameEntity } from '.';

export  class GameAction{
    value?: any;
    effect: GameEffect;
    attribute?: string;
    source?: GameEntity;
    destination?: GameEntity;
    card?: Card;
}