import { IOstream } from './istream';
import { Logger } from './logger';
import { Token } from './token';

const END_OF_LINE = '';
const operators = new Set([
  'q',
  ';',
  '(',
  ')',
  '{',
  '}',
  '+',
  '-',
  '*',
  '/',
  '!',
]);
const numbers = new Set([
  '.',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]);
export class Token_stream {
  private full = false;
  private logger: Logger;
  private buffer = Token.create('0');
  private istream: IOstream;

  constructor(logger: Logger, istream: IOstream) {
    this.logger = logger;
    this.istream = istream;
  }

  putback(t: Token) {
    if (this.full) {
      throw new Error('try putback in full buffer');
    }
    this.full = true;
    this.buffer = t;
    this.logger.log(`putback() => ${t}`);
  }

  hasNest() {
    const t = this.get();
    if (t.equal(END_OF_LINE)) {
      return false;
    }
    this.putback(t);
    return true;
  }

  get() {
    if (this.full) {
      this.logger.log(`get() | buffer => ${this.buffer}`);
      this.full = false;
      return this.buffer;
    }
    const char = this.istream.char();
    if (char === '') {
      this.logger.log(`get() | END_OF_LINE`);
      return Token.create(END_OF_LINE);
    }
    if (operators.has(char)) {
      this.logger.log(`get() | operators => ${char}`);
      return Token.create(char);
    }
    if (numbers.has(char)) {
      this.logger.log(`get() | numbers => ${char}`);
      this.istream.putback(char);
      const val = this.istream.number();
      return Token.create('8', val);
    }
    throw new Error('Bad token');
  }
}
