/**
 * Given an array arr and a chunk size size, return a chunked array.
 * A chunked array contains the original elements in arr,
 * but consists of subarrays each of length size.
 * The length of the last subarray may be less than size if arr.length is not evenly divisible by size.
 * You may assume the array is the output of JSON.parse. In other words, it is valid JSON.
 * Please solve it without using lodash's _.chunk function.
 *
 */

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
    if (arr.length === 0) {
        return [];
    }
    let result = [];
    let chunk = [];
    let chunk_count = 0;
    arr.forEach((x) => {
        if (chunk_count === size) {
            result.push(chunk);
            chunk = [];
            chunk_count = 0;
        }
        chunk_count++;
        chunk.push(x)
    })
    if (chunk.length !== 0) {
        result.push(chunk)
    }
    return result;
};

chunk([], 1); /*= */ // [[]]
chunk([1, 2], 5); /*= */ // [[1, 2]]
chunk([1, 9, 6, 3, 2], 1); /*= */ // [[1],[2],[3],[4],[5]]
chunk([1, 9, 6, 3, 2], 3); /*= */ // [[1,9,6],[3,2]]
chunk([1, 9, 6, 3, 2], 4); /*= */ // [[1,9,6, 3],[2]]
chunk([1, 9, 6, 3, 2], 2); /*= */ // [[1,9],[6,3][2]]
chunk([1, 9, 6, 3, 2, 4], 2); /*= */ // [[1,9], [6,3][2,4]]
