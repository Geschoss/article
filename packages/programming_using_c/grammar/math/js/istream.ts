import { Logger } from './logger';

const floating_point_number_reg = /[0-9|.]/g;

export class IOstream {
  private logger: Logger;
  private stream: string;

  constructor(logger: Logger, stream: string) {
    this.stream = stream;
    this.logger = logger;
  }
  char() {
    const char = this._char();
    this.logger.log(`char() => ${char}`);
    return char;
  }
  number() {
    let result = this._number();
    this.logger.log(`number() => ${result}`);
    return result;
  }
  putback(char: string) {
    this.logger.log(`putback() => ${char}`);
    this.stream = `${char}${this.stream}`;
  }

  private _putback(char: string) {
    this.stream = `${char}${this.stream}`;
  }

  private _char() {
    const char = this.stream.substring(0, 1);
    this.stream = this.stream.slice(1);
    return char;
  }
  private _number() {
    let result = '';
    while (true) {
      const char = this._char();
      if (char.search(floating_point_number_reg) === -1) {
        this._putback(char);
        break;
      }
      result += char;
    }
    return Number.parseFloat(result);
  }
}
