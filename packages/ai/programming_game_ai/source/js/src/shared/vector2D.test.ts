import { Vector2D } from './vector2D';

describe('Vector2D', () => {
  let vec_1: Vector2D;
  let vec_2: Vector2D;
  let vec_zero: Vector2D;
  beforeEach(() => {
    vec_1 = new Vector2D(4, 5);
    vec_2 = new Vector2D(-5, 12);
    vec_zero = new Vector2D();
  });

  describe('create', () => {
    test('create zero vector', () => {
      expect(vec_zero.x).toBe(0);
      expect(vec_zero.y).toBe(0);
    });
    test('create vector', () => {
      expect(vec_1.x).toBe(4);
      expect(vec_1.y).toBe(5);
    });
  });
  describe('methods', () => {
    test('length', () => {
      expect(vec_1.length).toBe(6.4031242374328485);
    });

    test('normalize', () => {
      let norm_vec = vec_1.normalize();
      expect(norm_vec.length).toBe(1);
      expect(norm_vec.x).toBe(0.6246950475544243);
      expect(norm_vec.y).toBe(0.7808688094430304);
    });

    test('must add two vectors', () => {
      let vec = vec_1.add(vec_2);
      expect(vec.x).toBe(-1);
      expect(vec.y).toBe(17);
    });
  });
});
