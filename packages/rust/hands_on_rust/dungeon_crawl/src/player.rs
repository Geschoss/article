use crate::prelude::*;

pub struct Player {
    pub position: Point,
    vision: i32,
}

impl Player {
    pub fn new(position: Point) -> Self {
        Self {
            position,
            vision: 15,
        }
    }
    pub fn render(&self, ctx: &mut BTerm, camera: &Camera) {
        ctx.set_active_console(1);
        ctx.set(
            self.position.x - camera.left_x,
            self.position.y - camera.top_y,
            WHITE,
            BLACK,
            to_cp437('@'),
        )
    }
    pub fn update(&mut self, ctx: &mut BTerm, map: &Map, camera: &mut Camera) {
        if let Some(key) = ctx.key {
            let delta = match key {
                VirtualKeyCode::Left => Point::new(-1, 0),
                VirtualKeyCode::Right => Point::new(1, 0),
                VirtualKeyCode::Up => Point::new(0, -1),
                VirtualKeyCode::Down => Point::new(0, 1),
                _ => Point::zero(),
            };
            let new_position = self.position + delta;
            if map.can_enter_tile(new_position) {
                self.position = new_position;
                camera.on_player_move(new_position);
            }
        }
    }

    pub fn in_vision(&self, point: Point) -> bool {
        (point.x - self.position.x) * (point.x - self.position.x)
            + (point.y - self.position.y) * (point.y - self.position.y)
            <= self.vision * self.vision
    }

    pub fn distance(&self, point: Point) -> f32 {
        1.0 - 1.0
            * (((point.x - self.position.x).pow(2) + (point.y - self.position.y).pow(2)) as f32)
                .sqrt()
            / self.vision as f32
    }
}
