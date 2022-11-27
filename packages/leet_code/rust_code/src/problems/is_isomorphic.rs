use std::collections::HashMap;

pub fn is_isomorphic(s: String, t: String) -> bool {
    if s.len() != t.len() {
        return false;
    }
    let mut linked_chars: HashMap<char, char> = HashMap::new();
    let mut uniq_chars: Vec<char> = vec![];

    let mut t_chars = t.chars();

    for s_char in s.chars() {
        let t_char = t_chars.next().unwrap();

        let present = linked_chars.insert(s_char, t_char);
        if let Some(val) = present {
            if val == t_char {
                continue;
            } else {
                return false;
            }
        } else {
            if uniq_chars.contains(&t_char) {
                return false;
            }
            uniq_chars.push(t_char);
        }
    }

    return true;
}

#[test]
fn is_isomorphic_test() {
    assert_eq!(is_isomorphic("eg".to_string(), "add".to_string()), false);
    assert_eq!(is_isomorphic("egg".to_string(), "add".to_string()), true);
    assert_eq!(is_isomorphic("foo".to_string(), "bar".to_string()), false);
    assert_eq!(
        is_isomorphic("paper".to_string(), "title".to_string()),
        true
    );
    assert_eq!(is_isomorphic("badc".to_string(), "baba".to_string()), false);
}
