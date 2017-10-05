import { GameEffect,
    Card,
    GameEvent,
    GameEntity } from '.';

export  class GameAction{
    effect: GameEffect;
    event?: GameEvent;
    source: GameEntity;
    destination?: GameEntity;
    card?: Card;
}