fn main() {

  println!("{}", add(1)(2));
}

fn add(i: i32) -> impl Fn(i32) -> i32 {
  move |j| { i + j }
}