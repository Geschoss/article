/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isIsomorphic = function(s, t) {
  if ((new Set(s)).size !== (new Set(t)).size) {
    return false;
  }
  let linked_chars = {};
  for (let i = 0; i < s.length; i++) {
    let s_char = s[i];
    let t_char = t[i];
    let linked_char = linked_chars[s_char];
    if (linked_char) {
      if (linked_char === t_char) {
        continue;
      }
      return false;
    } else {
      linked_chars[s_char] = t_char;
    }
  }
  return true;
};