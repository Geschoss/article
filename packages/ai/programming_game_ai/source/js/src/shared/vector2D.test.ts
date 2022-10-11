import { Vector2D } from './vector2D';

describe('Vector2D', () => {
  describe('create', () => {
    test('create zero vector', () => {
      let zero_v = new Vector2D();
      expect(zero_v.x).toBe(0);
      expect(zero_v.y).toBe(0);
    });
    test('create vector', () => {
      let vector = new Vector2D(4, 6);
      expect(vector.x).toBe(4);
      expect(vector.y).toBe(6);
    });
  });
});
