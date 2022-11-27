pub fn max_profit(prices: Vec<i32>) -> i32 {
    let mut min = i32::MAX;
    let mut max = 0;
    for val in prices.iter() {
        min = if min < *val { min } else { *val };
        max = if max > *val - min { max } else { *val - min };
    }
    max
}

#[test]
fn max_profit_test() {
    assert_eq!(max_profit(vec![7, 1, 5, 3, 6, 4]), 5);
    assert_eq!(max_profit(vec![7, 6, 4, 3, 1]), 0);
}
