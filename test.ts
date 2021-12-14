// { value: 5, left: {}, right: {} };

const tree = {
    value: 5,
    left: {
        value: 10,
        left: {
            value: 12
        },
        right: {
            value: 15,
        }
    },
    right: {
        value: 13,
        left: {
            value: 20,
        },
        right: {
            value: 30,
        }
    }
}
tree
function invertTree(node){
    let left = node.left;
    let right = node.right;

    if (left)
        node.left = invertTree(right);

    if (right) 
        node.right = invertTree(left);

    return node;
}

invertTree(tree) /* ? */