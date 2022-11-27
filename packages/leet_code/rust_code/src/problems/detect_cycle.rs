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

pub fn detect_cycle(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut fast_p = &head;
    let mut slow_p = &head;
    while fast_p.is_some() && fast_p.as_ref().unwrap().next.is_some() {
        fast_p = &fast_p.as_ref().unwrap().next.as_ref().unwrap().next;
        slow_p = &slow_p.as_ref().unwrap().next;
    }

    None
}

#[test]
fn detect_cycle_test() {
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
}
