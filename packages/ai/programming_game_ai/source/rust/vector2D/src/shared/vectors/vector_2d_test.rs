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
        let mut vec = Vector2d::new(4.0, 5.0);
        vec.normalize();
        assert_eq!(vec.length(), 1.0, "normalized vector length must be 1");
        assert_eq!(vec.to_string(), "{ x:0.625,y:0.781 }");
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
        let mut vec = Vector2d::new(4.0, 5.0);
        
        assert_eq!(vec.to_string(), "{ x:4.000,y:5.000 }");
        assert_eq!((vec * 2.0).to_string(), "{ x:8.000,y:10.000 }");
        assert_eq!(vec.is_zero(), false);
     
    }
}
