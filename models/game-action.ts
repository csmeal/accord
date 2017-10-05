import { GameEffect,
    Card,
    GameEvent,
    GameEntity } from '.';

export  class GameAction{
    gameEffect?: GameEffect;
    gameEvent?: GameEvent;
    source: GameEntity;
    destination?: GameEntity;
    card?: Card;
}