#[cfg(test)]
mod vector_2d_tests {
    use super::super::vector_2d::*;

    #[test]
    fn create_zero_vector() {
        let zero_vec = Vector2d::zero();
        assert_eq!(zero_vec.is_zero(), true);
    }

    #[test]
    fn length() {
        let vec = Vector2d::new(4.0, 5.0);
        assert_eq!(vec.length(), 6.4031242374328485);
    }

    #[test]
    fn normalize() {
        let vec = Vector2d::new(4.0, 5.0);
        let norm_vec = vec.normalize();
        assert_eq!(norm_vec.length(), 1.0, "normalized vector length must be 1");
        assert_eq!(norm_vec.to_string(), "{ x:0.625,y:0.781 }");
    }

    #[test]
    fn dot() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(-5.0, 12.0);

        assert_eq!(vec.dot(&vec_2), 40.0);
    }

    #[test]
    fn sign() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(-5.0, 12.0);
        let vec_3 = Vector2d::new(20.0, 12.0);

        assert_eq!(vec.sign(&vec_2), 1);
        assert_eq!(vec.sign(&vec_3), -1);
    }

    #[test]
    fn perp() {
        let perp_vec = Vector2d::new(4.0, 5.0).perp();

        assert_eq!(perp_vec.to_string(), "{ x:-5.000,y:4.000 }");
    }

    #[test]
    fn mul() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = vec.mul(2.0);
        let vec_3 = vec.mul(5.0);

        assert_eq!(vec.to_string(), "{ x:4.000,y:5.000 }");
        assert_eq!(vec_2.to_string(), "{ x:8.000,y:10.000 }");
        assert_eq!(vec_3.to_string(), "{ x:20.000,y:25.000 }");
    }

    #[test]
    fn truncate() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = vec.truncate(2.0);
        let vec_3 = vec.truncate(5.0);

        assert_eq!(vec.to_string(), "{ x:4.000,y:5.000 }");
        assert_eq!(vec_2.to_string(), "{ x:1.249,y:1.562 }");
        assert_eq!(vec_3.to_string(), "{ x:3.123,y:3.904 }");
    }

    #[test]
    fn distance() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(-4.0, 15.0);
        let vec_3 = Vector2d::new(4.0, -15.0);

        assert_eq!(vec.distance(&vec_2), 12.806248474865697);
        assert_eq!(vec.distance(&vec_3), 20.0);
    }

    #[test]
    fn distance_sq() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(-4.0, 15.0);
        let vec_3 = Vector2d::new(4.0, -15.0);

        assert_eq!(vec.distance_sq(&vec_2), 164.0);
        assert_eq!(vec.distance_sq(&vec_3), 400.0);
    }

    #[test]
    fn reverse() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(-4.0, 15.0);
        let vec_3 = Vector2d::new(4.0, -15.0);

        assert_eq!(vec.reverse().to_string(), "{ x:-4.000,y:-5.000 }");
        assert_eq!(vec_2.reverse().to_string(), "{ x:4.000,y:-15.000 }");
        assert_eq!(vec_3.reverse().to_string(), "{ x:-4.000,y:15.000 }");
    }
    
    #[test]
    fn operators_eq() {
        let vec = Vector2d::new(4.0, 5.0);
        let vec_2 = Vector2d::new(4.0, 5.0);
        let vec_3 = Vector2d::new(4.0, 6.0);

        assert_eq!(vec, vec_2);
        assert_ne!(vec, vec_3);
    }

    #[test]
    fn operators_add() {
        let vec = Vector2d::new(4.0, 5.0) + Vector2d::new(6.0, 5.0);
        let vec_3 = Vector2d::new(4.0, 6.0);
        let vec_4 = vec + vec_3;

        assert_eq!(vec, Vector2d::new(10.0, 10.0));
        assert_eq!(vec_4, Vector2d::new(14.0, 16.0));
    }

    #[test]
    fn operators_sub() {
        let vec = Vector2d::new(10.0, 10.0) - Vector2d::new(6.0, 5.0);
        let vec_3 = Vector2d::new(4.0, 5.0);
        let vec_4 = vec - vec_3;

        assert_eq!(vec, Vector2d::new(4.0, 5.0));
        assert_eq!(vec_4, Vector2d::new(0.0, 0.0));
        assert_eq!(vec_4.is_zero(), true);
    }

    #[test]
    fn operators_mul() {
        let vec = Vector2d::new(10.0, 10.0) * 2.0;
        let vec_2 = vec * 10.0;

        assert_eq!(vec, Vector2d::new(20.0, 20.0));
        assert_eq!(vec_2, Vector2d::new(200.0, 200.0));
    }
}
