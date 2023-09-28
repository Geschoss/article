/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    let acc = 0;
    return nums.map((value) => {
        acc = acc + value;
        return acc
    })
};


runningSum([1,2,3,4]) /* ? */ 