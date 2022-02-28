const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    }
  },
  right: {
    value: 3,
    right: {
      value: 5,
    }
  }
}

const sum = ({ left, right, value }) => {
  let lv = 0;
  let rv = 0;

  if (left) {
    lv = sum(left);
  }
  if (right) {
    rv = sum(right);
  }

  return value + lv + rv;
}

sum(tree) /* ? */