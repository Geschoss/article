/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null
  let curr = head;
  let next = null;
  while(curr != null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function node(list) {
  if (list.length === 0) {
    return null;
  }
  return new ListNode(list[0], node(list.slice(1)));
}

reverseList(node([])); /* ? */
reverseList(node([1])); /* ? */
reverseList(node([1, 2])); /* ? */
reverseList(node([1, 2, 3])); /* ? */
reverseList(node([1, 2, 3, 4])); /* ? */
