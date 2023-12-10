/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  const bracket_1 = new Bracket(nums1, m);
  const bracket_2 = new Bracket(nums2, n);
  nums1.splice(0, nums1.length);

  while (bracket_1.hasNext() || bracket_2.hasNext()) {
    if (bracket_1.value <= bracket_2.value) {
      nums1.push(bracket_1.value);
      bracket_1.pop();
    } else {
      nums1.push(bracket_2.value);
      bracket_2.pop();
    }
  }
  return nums1;
};

class Bracket {
  constructor(arr, count) {
    this.stack = [...arr].splice(0, count);
  }
  get value() {
    return this.stack[0] || Number.MAX_VALUE;
  }
  hasNext() {
    return this.stack.length !== 0;
  }
  pop() {
    this.stack.splice(0, 1);
  }
}

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3); //= //[1,2,2,3,5,6]
merge([-10, -1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3); //=
merge([1], 1, [], 0); //= // [1]
