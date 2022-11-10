fn main() {
  let mut grains: Vec<Cereal> = vec![];
  grains.push(Cereal::Rice);
  drop(grains);
  println!("{:?}", grains);
}

#[derive(Debug)]
enum Cereal {
  Barley, Miller, Rice,
  Rye, Spelt, Wheat,
}