use std::fmt;

pub struct Vector3d {
    x: f64,
    y: f64,
    z: f64,
}

impl fmt::Display for Vector3d {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{ x:{},y:{}, z:{} }}", self.x, self.y, self.z)
    }
}
