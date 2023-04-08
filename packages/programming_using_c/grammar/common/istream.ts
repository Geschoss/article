const floating_point_number_reg = /[0-9|.]/g;
const any_word_char_reg = /\w/g;

export class IOstream {
  private stream: string;

  constructor(stream: string) {
    this.stream = stream;
  }
  char() {
    const char = this.stream.substring(0, 1);
    this.stream = this.stream.slice(1);
    return char;
  }
  number() {
    let result = '';
    while (true) {
      const char = this.char();
      if (char.search(floating_point_number_reg) === -1) {
        this.putback(char);
        break;
      }
      result += char;
    }
    return Number.parseFloat(result);
  }
  putback(char: string) {
    this.stream = `${char}${this.stream}`;
  }
  word() {
    let result = '';
    while (true) {
      const char = this.char();
      if (char.search(any_word_char_reg) === -1) {
        if (char === '.') {
          this.putback(char);
          break;
        }
        break;
      }
      result += char;
    }
    return result;
  }
}

let ios = new IOstream('the fish swim.');
