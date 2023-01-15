use crate::prelude::*;

const NUM_TITLES: usize = (SCREEN_WIDTH * SCREEN_HEIGHT) as usize;

#[derive(Copy, Clone, PartialEq)]
pub enum TileType {
    Wall,
    Floor,
}

pub struct Map {
    pub tiles: Vec<TileType>,
}

impl Map {
    pub fn new() -> Self {
        Self {
            tiles: vec![TileType::Floor; NUM_TITLES],
        }
    }

    pub fn in_bounds(&self, point: Point) -> bool {
        point.x >= 0 && point.x < SCREEN_WIDTH && point.y >= 0 && point.y < SCREEN_HEIGHT
    }

    pub fn can_enter_tile(&self, point: Point) -> bool {
        self.in_bounds(point) && self.tiles[map_idx(point.x, point.y)] == TileType::Floor
    }

    pub fn try_idx(&self, point: Point) -> Option<usize> {
        if !self.in_bounds(point) {
            None
        } else {
            Some(map_idx(point.x, point.y))
        }
    }

    pub fn render(&self, ctx: &mut BTerm, camera: &Camera, player: &Player) {
        ctx.set_active_console(0);
        for y in camera.top_y..camera.bottom_y {
            for x in camera.left_x..camera.right_x {
                let point = Point::new(x, y);
                if self.in_bounds(point) && player.in_vision(point) {
                    let distance = player.distance(point);
                    let idx = map_idx(x, y);
                    match self.tiles[idx] {
                        TileType::Floor => ctx.set(
                            x - camera.left_x,
                            y - camera.top_y,
                            RGBA::from_f32(1.0, 255.0 / 1.0, 0.0, distance),
                            BLACK,
                            to_cp437('.'),
                        ),
                        TileType::Wall => ctx.set(
                            x - camera.left_x,
                            y - camera.top_y,
                            RGBA::from_f32(255.0 / 152.0, 255.0 / 251.0, 255.0 / 152.0, distance),
                            BLACK,
                            to_cp437('#'),
                        ),
                    }
                }
            }
        }
    }
}

pub fn map_idx(x: i32, y: i32) -> usize {
    ((y * SCREEN_WIDTH) + x) as usize
}
