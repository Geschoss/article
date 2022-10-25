export type Location = 'shack' | 'goldmine' | 'bank' | 'saloon';
export interface State<T> {
  name: string;
  enter(miner: T): void;
  execute(miner: T): void;
  exit(miner: T): void;
}