// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
    #[inline]
    fn new_with_next(val: i32, next: Option<Box<ListNode>>) -> Self {
        ListNode { next, val }
    }
}

pub fn merge_two_lists(
    list1: Option<Box<ListNode>>,
    list2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    if let None = list1 {
        return list2;
    }
    if let None = list2 {
        return list1;
    }

    let mut l1 = list1.unwrap();
    let mut l2 = list2.unwrap();

    if l1.val < l2.val {
        l1.next = merge_two_lists(l1.next, Some(l2));
        return Some(l1);
    }

    l2.next = merge_two_lists(Some(l1), l2.next);
    return Some(l2);
}

pub fn merge_two_lists_2(
    list1: Option<Box<ListNode>>,
    list2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    match (list1, list2) {
        (None, None) => None,
        (Some(n), None) | (None, Some(n)) => Some(n),
        (Some(mut l1), Some(mut l2)) => {
            if l1.val < l2.val {
                l1.next = merge_two_lists_2(l1.next, Some(l2));
                return Some(l1);
            }
            l2.next = merge_two_lists_2(Some(l1), l2.next);
            return Some(l2);
        }
    }
}
#[test]
fn merge_two_lists_test() {
    fn create(val: i32) -> Option<Box<ListNode>> {
        Option::Some(Box::new(ListNode::new(val)))
    }

    fn create_with_next(val: i32, next: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        Option::Some(Box::new(ListNode::new_with_next(val, next)))
    }
    fn node(vec: Vec<i32>) -> Option<Box<ListNode>> {
        if vec.len() == 0 {
            return None;
        }
        let tail = &vec[1..];
        return create_with_next(vec[0], node(tail.to_vec()));
    }
    assert_eq!(merge_two_lists(None, None), None);
    assert_eq!(merge_two_lists(None, create(0)), create(0));
    assert_eq!(
        merge_two_lists(node(vec![1, 2, 4]), node(vec![1, 3, 4]),),
        node(vec![1, 1, 2, 3, 4, 4]),
    );

    assert_eq!(merge_two_lists_2(None, None), None);
    assert_eq!(merge_two_lists_2(None, create(0)), create(0));
    assert_eq!(
        merge_two_lists_2(node(vec![1, 2, 4]), node(vec![1, 3, 4]),),
        node(vec![1, 1, 2, 3, 4, 4]),
    );
}
