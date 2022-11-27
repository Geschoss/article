/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
    let result = ListNode(null);
    let current = result;
    while(list1 != null && list2 !== null) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    if (list1 !== null) {
        current.next = list1;
    }
    if (list2 !== null) {
        current.next = list2;
    }
    return result.next;
};
function ListNode(val, next) {
    return {
        val: (val===undefined ? 0 : val),
        next: (next===undefined ? null : next),
    }
}
function node(list) {
    if (list.length === 0) {
        return null;
    }
    return ListNode(list[0], node(list.slice(1)))
}

var mergeTwoListsRec = function(l1, l2) {
    if(!l1 || !l2) return (l1? l1:l2);
    if(l1.val < l2.val) {
      l1.next = mergeTwoListsRec(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoListsRec(l1, l2.next);
      return l2;
    }
  };

mergeTwoLists(node([1, 2, 4]), node([1, 3, 4])) /* ? */ //[1,1,2,3,4,4]
mergeTwoLists(node([1, 2]), node([1, 3, 4])) /* ? */ //[1,1,2,3,4]
mergeTwoLists(node([1, 2, 3, 5]), node([1,3,4])) /* ? */
mergeTwoLists(node([]), node([])) /* ? */ 
mergeTwoLists(node([]), node([0])) /* ? */
mergeTwoLists(node([]), node([0, 1, 2])) /* ? */ 
mergeTwoLists(node([1, 2, 3]), node([])) /* ? */