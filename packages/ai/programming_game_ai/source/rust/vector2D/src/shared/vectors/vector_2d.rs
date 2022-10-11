use std::fmt;
use std::ops;

pub struct Vector2d {
    x: f64,
    y: f64,
}

impl PartialEq for Vector2d {
    fn eq(&self, other: &Self) -> bool {
        return self.x == other.x && self.y == other.y;
    }
}

impl ops::Mul<f64> for Vector2d {
    type Output = Self;

    fn mul(mut self, _rhs: f64) -> Self::Output {
        self.x = self.x * _rhs;
        self.y = self.y * _rhs;
        return self;
    }
}

impl fmt::Display for Vector2d {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{ x:{:.3},y:{:.3} }}", self.x, self.y)
    }
}

impl Vector2d {
    pub fn new(x: f64, y: f64) -> Self {
        Self { x, y }
    }
    pub fn zero() -> Self {
        Self { x: 0.0, y: 0.0 }
    }
    pub fn is_zero(&self) -> bool {
        return self.x == 0.0 && self.y == 0.0;
    }
    pub fn length(&self) -> f64 {
        return (self.x.powf(2.0) + self.y.powf(2.0)).sqrt();
    }
    pub fn length_sq(&self) -> f64 {
        return self.x.powf(2.0) + self.y.powf(2.0);
    }

    pub fn normalize(&mut self) {
        let l = self.length();

        self.x = self.x / l;
        self.y = self.y / l;
    }
    pub fn dot(&self, v2: &Vector2d) -> f64 {
        return self.x * v2.x + self.y * v2.y;
    }
    pub fn sign(&self, v2: &Vector2d) -> i8 {
        if self.y * v2.x > self.x * v2.y {
            return -1;
        }
        return 1;
    }

    pub fn perp(&self) -> Self {
        return Self {
            x: -self.y,
            y: self.x,
        };
    }
    // pub fn truncate(&self, max: f64) -> Vector2D {
    //     if self.length() > max {
    //         let vec = self.normalize();
    //         return vec * max;
    //     }
    //     return Vector2D {
    //         x: self.x,
    //         y: self.y,
    //     };
    // }
}
