use clap::Parser;
use std::{
    error::Error,
    fs::File,
    io::{self, BufRead, BufReader},
};

type MyResult<T> = Result<T, Box<dyn Error>>;

#[derive(Parser, Debug)]
#[command(name = "uniqr")]
#[command(author = "peko")]
#[command(version = "0.0.1")]
pub struct Config {
    in_file: Option<String>,
    out_file: Option<String>,
    #[arg(short, long, default_value_t = false)]
    count: bool,
}

fn open(filename: Option<String>) -> MyResult<Box<dyn BufRead>> {
    match filename {
        None => Ok(Box::new(BufReader::new(io::stdin()))),
        Some(name) => Ok(Box::new(BufReader::new(File::open(name)?))),
    }
}

pub fn run(config: Config) -> MyResult<()> {
    let mut file = open(config.in_file).map_err(|e| format!("{}", e))?;
    let mut line = String::new();
    loop {
        let bytes = file.read_line(&mut line)?;
        if bytes == 0 {
            break;
        }
        print!("{}", line);
        line.clear();
    }
    Ok(())
}

pub fn get_args() -> MyResult<Config> {
    let config = Config::parse();

    Ok(config)
}
