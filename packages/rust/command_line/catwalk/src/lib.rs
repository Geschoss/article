use clap::{App, Arg};
use std::error::Error;

#[derive(Debug)]
pub struct Config {
    files: Vec<String>,
    number_lines: bool,
    number_nonblank_lines: bool,
}

type TestResult<T> = Result<T, Box<dyn Error>>;
pub fn run(config: Config) -> TestResult<()> {
    dbg!(config);
    Ok(())
}

pub fn get_args() -> TestResult<Config> {
    let matcher = App::new("catwalk")
        .version("0.1.0")
        .author("pako")
        .about("Rust cat")
        .arg(
            Arg::with_name("number_nonblank_lines")
                .short("n")
                .help("number all output lines")
                .takes_value(false),
        )
        .arg(
            Arg::with_name("number_lines")
                .short("b")
                .help("number nonempty output lines")
                .takes_value(false),
        )
        .arg(
            Arg::with_name("files")
                .value_name("FILE")
                .help("input files")
                .required(true)
                .min_values(1),
        )
        .get_matches();

    Ok(Config {
        files: matcher.values_of_lossy("files").unwrap(),
        number_lines: matcher.is_present("number_lines"),
        number_nonblank_lines: matcher.is_present("number_nonblank_lines"),
    })
}
