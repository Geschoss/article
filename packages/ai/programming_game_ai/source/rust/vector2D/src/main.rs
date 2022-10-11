mod shared;
use shared::vectors::vector_2d::Vector2d;

fn main() {
    let vec = Vector2d::new(4.0, 5.0);
    let vec2 = Vector2d::new(5.0, -8.0);
    let zero_vec = Vector2d::zero();
    println!("vec= {}", vec);
    println!("zero_vec= {}", zero_vec);
    println!("is_zero= {}", zero_vec.is_zero());
    println!("length= {}", vec.length());
    println!("length_sq= {}", vec.length_sq());
    println!("dot= {}", vec.dot(&vec2));
    println!("sign= {}", vec.sign(&vec2));
    println!("perp= {}", vec.perp());
    // let vec_3 = vec * 3.0;
    // println!("vec_3= {}", vec_3);
    // println!("truncate= {}", vec_3.truncate(6.0));
}
