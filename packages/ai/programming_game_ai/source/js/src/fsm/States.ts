import { Miner } from './Miner';
import { State } from './types';

export class GoHomeAndSleepTilRested implements State<Miner> {
  name = 'GoHomeAndSleepTilRested';
  enter(miner: Miner): void {
    if (miner.location !== 'shack') {
      console.log(`\n ${miner.name}: Walkin' home`);
      miner.walk_to('shack');
    }
  }
  execute(miner: Miner): void {
    if (miner.fatigued()) {
      console.log(
        `\n ${miner.name}: What a God darn fantastic nap! Time to find more gold!`
      );
      miner.change_state(new EnterMineAndDigForNugget());
    } else {
      miner.decrease_fatigue();
      console.log(`\n ${miner.name}: ZZZZZzzz...`);
    }
  }
  exit(miner: Miner): void {
    console.log(`\n ${miner.name}: Leaving the house`);
  }
}

export class EnterMineAndDigForNugget implements State<Miner> {
  name = 'EnterMineAndDigForNugget';
  enter(miner: Miner): void {
    if (miner.location !== 'goldmine') {
      console.log(`\n ${miner.name}: Walking to the goldmine`);
      miner.walk_to('goldmine');
    }
  }
  execute(miner: Miner): void {
    miner.add_to_gold_carried(1);
    miner.increase_fatigue();
    console.log(`\n ${miner.name}: Picking up a nugget`);
    if (miner.pockets_full()) {
      miner.change_state(new VisitBankAndDepositGold());
    }
    if (miner.thirsty()) {
      miner.change_state(new QuenchThirst());
    }
  }
  exit(miner: Miner): void {
    console.log(
      `\n ${miner.name}: Ah'm leavin' the gold mine with mah pockets full o' sweet gold`
    );
  }
}

export class VisitBankAndDepositGold implements State<Miner> {
  name = 'VisitBankAndDepositGold';
  enter(miner: Miner): void {
    if (miner.location !== 'bank') {
      console.log(`\n ${miner.name}: Goin' to the bank. Yes siree`);
      miner.walk_to('bank');
    }
  }
  execute(miner: Miner): void {
    miner.add_to_wealth(miner.gold_carried);
    miner.gold_carried = 0;
    console.log(
      `\n ${miner.name}: Depositing gold. Total saving now: ${miner.money_in_back}`
    );
  }
  exit(miner: Miner): void {
    throw new Error('Method not implemented.');
  }
}

export class QuenchThirst implements State<Miner> {
  name = 'QuenchThirst';
  enter(miner: Miner): void {
    throw new Error('Method not implemented.');
  }
  execute(miner: Miner): void {
    throw new Error('Method not implemented.');
  }
  exit(miner: Miner): void {
    throw new Error('Method not implemented.');
  }
}
