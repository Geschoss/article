import { BaseGameEntity } from './BaseGameEntity';
import { GoHomeAndSleepTilRested } from './States';
import { State, Location } from './types';

const MAX_NUGGETS = 3;
const MAX_TRIRST_LEVEL = 5;
const MAX_TIREDNESS_THRESHOLD = 5;

export class Miner extends BaseGameEntity {
  readonly name: string;
  location: Location;
  gold_carried: number;
  money_in_back: number;
  thirst: number;
  fatigue: number;
  current_state: State<Miner>;

  constructor(name: string) {
    super();
    this.name = name;
    this.thirst = 0;
    this.fatigue = 0;
    this.location = 'shack';
    this.gold_carried = 0;
    this.money_in_back = 0;
    this.current_state = new GoHomeAndSleepTilRested();
  }

  change_state(state: State<Miner>) {
    this.current_state.exit(this);
    this.current_state = state;
    this.current_state.enter(this);
  }

  update() {
    this.thirst += 1;
    if (this.current_state) {
      this.current_state.execute(this);
    }
  }

  walk_to(loc: Location) {
    this.location = loc;
  }

  add_to_gold_carried(gold: number) {
    this.gold_carried += gold;
    if (this.gold_carried < 0) {
      this.gold_carried = 0;
    }
  }

  increase_fatigue() {
    this.fatigue += 1;
  }
  decrease_fatigue() {
    this.fatigue -= 1;
  }

  pockets_full() {
    return this.gold_carried >= MAX_NUGGETS;
  }

  thirsty() {
    return this.thirst >= MAX_TRIRST_LEVEL;
  }

  fatigued() {
    return this.fatigue > MAX_TIREDNESS_THRESHOLD;
  }

  add_to_wealth(value: number) {
    this.money_in_back += value;
    if (this.money_in_back < 0) {
      this.money_in_back = 0;
    }

  }
}
