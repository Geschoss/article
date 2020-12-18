/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums: number[], target: number) {
    let length = nums.length;
    for (let startIndex = 0; startIndex < length - 1; startIndex++) {
        for (let index = 1 + startIndex; index < length; index++) {
            let sum = nums[startIndex] + nums[index];
            if (sum === target) {
                return [startIndex, index];
            }
        }
    }
    return [];
};

twoSum([2, 7, 11,15], 9); /* ? */
twoSum([3, 2, 4], 6); /* ? */
twoSum([3,3], 6); /* ? */
