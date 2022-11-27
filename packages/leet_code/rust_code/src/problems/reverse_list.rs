// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new_with_next(val: i32, next: Option<Box<ListNode>>) -> Self {
        ListNode { next, val }
    }
}

pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut prev: Option<Box<ListNode>> = None;
    let mut curr = head;
    while let Some(mut node) = curr {
        curr = node.next;
        node.next = prev;
        prev = Some(node);
    }
    prev
}

#[test]
fn reverse_list_test() {
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

    assert_eq!(reverse_list(node(vec![])), node(vec![]));
    assert_eq!(reverse_list(node(vec![1])), node(vec![1]));
    assert_eq!(reverse_list(node(vec![1, 2])), node(vec![2, 1]));
    assert_eq!(reverse_list(node(vec![1, 2, 3])), node(vec![3, 2, 1]));
    assert_eq!(reverse_list(node(vec![1, 2, 3, 4])), node(vec![4, 3, 2, 1]));
}
