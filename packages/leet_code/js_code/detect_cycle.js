/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycleMemory = function (head) {
  let index = 0;
  let hash = new Map();
  let node = head;
  while (node != null) {
    let data = hash.get(node);
    if (data !== undefined) {
      return data.node;
    }
    hash.set(node, { index, node });
    node = node.next;
    index++;
  }
  return null;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function cycle(list, j = -1) {
  if (list.length === 0) {
    return null;
  }
  let link = null;
  let head = new ListNode(list[0], null);
  if (j === 0) {
    link = head;
  }
  let curr = head;
  for (let i = 1; i < list.length; i++) {
    curr.next = new ListNode(list[i], null);
    if (i === j) {
      link = curr.next;
    }
    curr = curr.next;
  }
  curr.next = link;
  return head;
}

var detectCycle = function (head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return detectCyclePos(head, slow);
    }
  }
  return null;
};
const detectCyclePos = (head, intersection) => {
  let p1 = head;
  let p2 = intersection;
  while (p1 !== p2) { 
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};
detectCycle(cycle([1])); /* ? */ // -1
detectCycle(cycle([1,2], 0)); /* ? */ // 0
detectCycle(cycle([3,2,0,-4], 1)); /* ? */ // 1
detectCycle(cycle([3,2,0,-4, 5], 1)); /* ? */ // 1
