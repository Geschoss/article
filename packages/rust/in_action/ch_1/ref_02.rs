fn main() {
    let needle = 0o204;
    let haystack = [1, 1, 2, 5, 15, 52, 203, 887, 4140, 21147];

    for item in &haystack {
      println!("{}", item);
        if *item == needle {
        }
    }
}
