import { Player, Lane } from '../lib.models';

export class MythPlayer implements Player {
  name: string;
  owner = null;
  lanes: Lane[];
  Player() {}
}

export class Hand implements Lane {
  name: 'Hand';
  owner = null;
  maxObjects = 7;
  effets = [];
  cards = [];
  Hand(owner: Player) {
    this.owner = owner;
  }
}

export class Graveyard implements Lane {
  name: 'Hand';
  owner = null;
  maxObjects = null;
  effets = [];
  cards = [];
  Graveyard(owner: Player) {
    this.owner = owner;
  }
}
