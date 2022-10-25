import { Miner } from '../Miner';

describe('Miner', () => {
  test('create', () => {
    let miner = new Miner('Minner Bob');
    expect(miner.id).toBe(1);
    expect(miner.name).toBe('Minner Bob');
    expect(miner.location).toBe('shack');
    // expect(miner.current_state.name).toBe('GoHomeAndSleepTilRested');
  });
});
