fn main() {
  let a = 10; // type can be inferred by the compiler
  let b: i32 = 20; // ... or declared by the programmer 
  let c = 30i32; // Numeric types can include a type annotation in their literal form
  let d = 30_i32; // ... can include underscores, which are intended to increase readability and have no functional impact
  let e = add(add(a, b), add(c, d)); 

  println!("(a + b) + (c + d) = {}", e);
}

fn add(i: i32, j: i32) -> i32 {
  i + j
}