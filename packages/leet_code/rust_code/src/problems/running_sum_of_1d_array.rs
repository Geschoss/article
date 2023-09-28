pub fn running_sum_of_1d_array(nums: Vec<i32>) -> Vec<i32> {
    let mut acc = 0;
    nums.into_iter().map(|num| {
        acc = acc + num;
        acc
    }).collect()
}

#[test]
fn test() {
    assert_eq!(running_sum_of_1d_array(vec![1, 2, 3, 4]), vec![1, 3, 6, 10]);
    assert_eq!(running_sum_of_1d_array(vec![1,1,1,1,1]), vec![1, 2, 3, 4, 5]);
}
