fn add_with_lifetime<'a, 'b>(i: &'a i32, j: &'b i32) -> i32 {
  *i + *j
}

fn add<T: std::ops::Add<Output = T>(i: T, j: T) -> T {
  i + j
}
fn main() {
  let a = 10;
  let b = 20;
  let res = add_with_lifetimes(&a, &b);
  let res_2 = add(a, b);
}
