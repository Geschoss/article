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
var middleNode = function (head) {
    let deep = 0;
    let curr = head;
    while(curr != null) {
        deep++;
        curr = curr.next;
    }
    let middle = Math.floor(deep / 2);

    let i = 0;
    let tail = head;
    while(i < middle) {
        i++;
        tail = tail.next
    }

    return tail;
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

middleNode(node([1, 2])); /* ? */
middleNode(node([1, 2, 3])); /* ? */
middleNode(node([1, 2, 3, 4])); /* ? */
// middleNode(node([1, 2, 3, 4, 5])); /* ? */
// middleNode(node([1, 2, 3, 4, 5, 6])); /* ? */
