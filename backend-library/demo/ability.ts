import {
  Ability,
  Cost,
  PlayerZone,
  Id,
  Target,
  TargetType,
  FriendlyType,
  CostType
} from '../../models';
import { Creature } from './card';
import { PlayCreatureCommand } from './command';
import { HearthstoneGame } from './game';
import { HearthstonePlayer } from './player';

export class CastCreature implements Ability {
  name = 'castCreature';

  card: Creature;
  usableZone = [PlayerZone.hand];
  validTargets = (g: HearthstoneGame, player: HearthstonePlayer) =>
    player.active &&
    player.battlefield.cards.size < player.battlefield.maxCards &&
    player.activeMana >= this.cost[0].count &&
    player.battlefield.cards.has(this.card.id);

  constructor(public cost: Cost[]) {}

  dewit = (deets: { playerId: Id; cardId: Id }) =>
    new PlayCreatureCommand(deets.playerId, deets.cardId);
}

export class AttackCreature implements Ability {
  name = 'cast';

  card: Creature;
  usableZone = [PlayerZone.battlefield];
  validTargets = (g: HearthstoneGame, player: HearthstonePlayer) => {
    if (
      player.active &&
      player.battlefield.cards.has(this.card.id) &&
      this.card.activeEnergy > 0
    ) {
      const otherP = g.players.get(
        Array.from(g.players.keys()).filter(id => id !== player.id)[0]
      );
      const result: Target[] = Array.from(
        otherP.battlefield.cards.values()
      ).map(c => {
        return {
          target: TargetType.creature,
          id: c.id,
          enemy: FriendlyType.enemy
        };
      });
      result.push({
        target: TargetType.player,
        id: otherP.id,
        enemy: FriendlyType.enemy
      });

      return result;
    } else {
      return false;
    }
  };
  constructor(
    public cost: Cost[] = [{ resource: CostType.energy, count: 1 }]
  ) {}

  dewit = (deets: { playerId: Id; cardId: Id }) =>
    new PlayCreatureCommand(deets.playerId, deets.cardId);
}
