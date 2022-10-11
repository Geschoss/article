use std::fmt;
use std::ops::{Add, Mul, Sub};

#[derive(Debug, Copy, Clone, PartialEq)]
pub struct Vector2d {
    x: f64,
    y: f64,
}

impl Add for Vector2d {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

impl Mul<f64> for Vector2d {
    type Output = Self;

    fn mul(self, rhs: f64) -> Self {
        Self {
            x: self.x * rhs,
            y: self.y * rhs,
        }
    }
}

impl Sub for Vector2d {
    type Output = Self;

    fn sub(self, other: Self) -> Self {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
        }
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

    pub fn normalize(&self) -> Self {
        let l = self.length();

        return Self {
            x: self.x / l,
            y: self.y / l,
        };
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

    pub fn mul(&self, _rhs: f64) -> Self {
        return Self {
            x: self.x * _rhs,
            y: self.y * _rhs,
        };
    }

    pub fn truncate(&self, max: f64) -> Self {
        if self.length() > max {
            let vec = self.normalize();
            return vec.mul(max);
        }
        return Self {
            x: self.x,
            y: self.y,
        };
    }

    pub fn distance(&self, v2: &Vector2d) -> f64 {
        let y_separation = v2.y - self.y;
        let x_separation = v2.x - self.x;

        return (y_separation.powi(2) + x_separation.powi(2)).sqrt();
    }

    pub fn distance_sq(&self, v2: &Vector2d) -> f64 {
        let y_separation = v2.y - self.y;
        let x_separation = v2.x - self.x;

        return y_separation.powi(2) + x_separation.powi(2);
    }

    pub fn reverse(&self) -> Self {
        return Self {
            x: -self.x,
            y: -self.y,
        };
    }
}
