use assert_cmd::Command;
use predicates::prelude::*;
use rand::{distributions::Alphanumeric, Rng};
use std::io::prelude::*;
use std::{
    error::Error,
    fs::{self, File},
};
use regex::Regex;

type TestResult = Result<(), Box<dyn Error>>;

const PRG: &str = "headr";
const EMPTY: &str = "./tests/inputs/empty.txt";
const ONE: &str = "./tests/inputs/one.txt";
const TWO: &str = "./tests/inputs/two.txt";
const THREE: &str = "./tests/inputs/three.txt";
const TEN: &str = "./tests/inputs/ten.txt";

use headr::parse_positive_int;

#[test]
fn test_parse_positive_int() {
    let res = parse_positive_int("3");
    assert!(res.is_ok());
    assert_eq!(res.unwrap(), 3);

    let res = parse_positive_int("foo");
    assert!(res.is_err());
    assert_eq!(res.unwrap_err().to_string(), "foo".to_string());

    let res = parse_positive_int("0");
    assert!(res.is_err());
    assert_eq!(res.unwrap_err().to_string(), "0".to_string());
}

// --------------------------------------------------
fn random_string() -> String {
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(7)
        .map(char::from)
        .collect()
}

// --------------------------------------------------
fn gen_bad_file() -> String {
    loop {
        let filename = random_string();
        if fs::metadata(&filename).is_err() {
            return filename;
        }
    }
}

// --------------------------------------------------
#[test]
fn dies_bad_bytes() -> TestResult {
    let bad = random_string();
    let expected = format!("illegal byte count -- {}", &bad);
    Command::cargo_bin(PRG)?
        .args(&["-c", &bad, EMPTY])
        .assert()
        .failure()
        .stderr(predicate::str::contains(expected));

    Ok(())
}

// --------------------------------------------------
#[test]
fn dies_bad_lines() -> TestResult {
    let bad = random_string();
    let expected = format!("illegal line count -- {}", &bad);
    Command::cargo_bin(PRG)?
        .args(&["-n", &bad, EMPTY])
        .assert()
        .failure()
        .stderr(predicate::str::contains(expected));

    Ok(())
}

// --------------------------------------------------
#[test]
fn dies_bytes_and_lines() -> TestResult {
    let msg = "The argument '--lines <LINES>' cannot be \
               used with '--bytes <BYTES>'";

    Command::cargo_bin(PRG)?
        .args(&["-n", "1", "-c", "2"])
        .assert()
        .failure()
        .stderr(predicate::str::contains(msg));

    Ok(())
}

// --------------------------------------------------
#[test]
fn skips_bad_file() -> TestResult {
    let bad = gen_bad_file();
    let expected = format!("{}: .* [(]os error 2[)]", bad);
    Command::cargo_bin(PRG)?
        .args([EMPTY, &bad, ONE])
        .assert()
        .stderr(predicate::str::is_match(expected)?);

    Ok(())
}
// --------------------------------------------------
fn run(args: &[&str], expected_file: &str) -> TestResult {
    // Extra work here due to lossy UTF
    let mut file = File::open(expected_file)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    let expected = String::from_utf8_lossy(&buffer);

    Command::cargo_bin(PRG)?
        .args(args)
        .assert()
        .success()
        .stdout(predicate::eq(&expected.as_bytes() as &[u8]));

    Ok(())
}
// --------------------------------------------------
fn run_stdin(args: &[&str], input_file: &str, expected_file: &str) -> TestResult {
    // Extra work here due to lossy UTF
    let mut file = File::open(expected_file)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    let expected = String::from_utf8_lossy(&buffer);
    let input = fs::read_to_string(input_file)?;

    Command::cargo_bin(PRG)?
        .write_stdin(input)
        .args(args)
        .assert()
        .stdout(predicate::eq(&expected.as_bytes() as &[u8]));

    Ok(())
}
// --------------------------------------------------
#[test]
fn empty_n2() -> TestResult {
    run(&[EMPTY, "-n", "2"], "tests/expected/empty.txt.n2.out")
}

// --------------------------------------------------
#[test]
fn empty_n4() -> TestResult {
    run(&[EMPTY, "-n", "4"], "tests/expected/empty.txt.n4.out")
}
// --------------------------------------------------
#[test]
fn empty_c2() -> TestResult {
    run(&[EMPTY, "-c", "2"], "tests/expected/empty.txt.c2.out")
}

// --------------------------------------------------
#[test]
fn empty_c4() -> TestResult {
    run(&[EMPTY, "-c", "4"], "tests/expected/empty.txt.c4.out")
}
// --------------------------------------------------
#[test]
fn one() -> TestResult {
    run(&[ONE], "tests/expected/one.txt.out")
}

#[test]
fn one_n2() -> TestResult {
    run(&[ONE, "-n", "2"], "tests/expected/one.txt.n2.out")
}

#[test]
fn one_n4() -> TestResult {
    run(&[ONE, "-n", "4"], "tests/expected/one.txt.n4.out")
}

#[test]
fn one_c1() -> TestResult {
    run(&[ONE, "-c", "1"], "tests/expected/one.txt.c1.out")
}

#[test]
fn one_c2() -> TestResult {
    run(&[ONE, "-c", "2"], "tests/expected/one.txt.c2.out")
}

#[test]
fn one_c4() -> TestResult {
    run(&[ONE, "-c", "4"], "tests/expected/one.txt.c4.out")
}

#[test]
fn one_stdin() -> TestResult {
    run_stdin(&[], ONE, "tests/expected/one.txt.out")
}

#[test]
fn one_n2_stdin() -> TestResult {
    run_stdin(&["-n", "2"], ONE, "tests/expected/one.txt.n2.out")
}

#[test]
fn one_n4_stdin() -> TestResult {
    run_stdin(&["-n", "4"], ONE, "tests/expected/one.txt.n4.out")
}

#[test]
fn one_c1_stdin() -> TestResult {
    run_stdin(&["-c", "1"], ONE, "tests/expected/one.txt.c1.out")
}

#[test]
fn one_c2_stdin() -> TestResult {
    run_stdin(&["-c", "2"], ONE, "tests/expected/one.txt.c2.out")
}

#[test]
fn one_c4_stdin() -> TestResult {
    run_stdin(&["-c", "4"], ONE, "tests/expected/one.txt.c4.out")
}
// --------------------------------------------------
#[test]
fn two() -> TestResult {
    run(&[TWO], "tests/expected/two.txt.out")
}

#[test]
fn two_n2() -> TestResult {
    run(&[TWO, "-n", "2"], "tests/expected/two.txt.n2.out")
}

#[test]
fn two_n4() -> TestResult {
    run(&[TWO, "-n", "4"], "tests/expected/two.txt.n4.out")
}

#[test]
fn two_c2() -> TestResult {
    run(&[TWO, "-c", "2"], "tests/expected/two.txt.c2.out")
}

#[test]
fn two_c4() -> TestResult {
    run(&[TWO, "-c", "4"], "tests/expected/two.txt.c4.out")
}

#[test]
fn two_stdin() -> TestResult {
    run_stdin(&[], TWO, "tests/expected/two.txt.out")
}

#[test]
fn two_n2_stdin() -> TestResult {
    run_stdin(&["-n", "2"], TWO, "tests/expected/two.txt.n2.out")
}

#[test]
fn two_n4_stdin() -> TestResult {
    run_stdin(&["-n", "4"], TWO, "tests/expected/two.txt.n4.out")
}

#[test]
fn two_c2_stdin() -> TestResult {
    run_stdin(&["-c", "2"], TWO, "tests/expected/two.txt.c2.out")
}

#[test]
fn two_c4_stdin() -> TestResult {
    run_stdin(&["-c", "4"], TWO, "tests/expected/two.txt.c4.out")
}


#[test]
fn regexp_test() {
    let re = Regex::new(r"(\d*)([KMGT])").unwrap();
    let caps_1 = re.captures("1K").unwrap();
    let caps_2 = re.captures("1M").unwrap();

    
}