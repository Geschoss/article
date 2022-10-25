export class BaseGameEntity {
  private static next_valid_id: number = 0;
  id: number;
  constructor() {
    BaseGameEntity.next_valid_id += 1;
    this.id = BaseGameEntity.next_valid_id;
  }

  update() {
    throw new Error(`Update function must be implemented in ${this.id}`);
  }
}
