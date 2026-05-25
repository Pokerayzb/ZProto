import { GameEvent } from '@game/events/GameEvent';

export type AwardItem = readonly [itemId: string, amount: number];

export class Award extends GameEvent {
  readonly gold: number;
  readonly experience: number;
  readonly items: readonly AwardItem[];

  constructor(
    gold: number,
    experience: number,
    items: readonly AwardItem[] = [],
  ) {
    super();
    this.gold = gold;
    this.experience = experience;
    this.items = items;
  }
}
