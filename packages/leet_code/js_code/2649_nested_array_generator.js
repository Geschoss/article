/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function*(arr) {
   for (const iterator of arr) {
        if (Array.isArray(iterator)) {
            yield* inorderTraversal(iterator) 
        } else {
            yield iterator;
        }
   } 
};

const gen = inorderTraversal([1, [2, 3]]);
gen.next().value; //= //1
gen.next().value; //= //2
gen.next().value; //= //3
gen.next().done; //= //3
