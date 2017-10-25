import { GameEffect,
    Card,
    GameAttribute,
    GameEntity } from '.';

export class GameAction{
    value?: any;
    effect: GameEffect;
    attribute?: string;
    source?: GameEntity;
    destination?: GameEntity;

    static createDrawEffect(player: number, card: Card): GameAction {
        return {
            value: card,
            effect: GameEffect.AddAttribute,
            attribute: 'hand',
            destination: {
                player: player
            }
        }
    }
}