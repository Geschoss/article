import { IOstream } from '../../common/istream';
import { Token } from './token';

const END_OF_LINE = '';

const verbs = new Set(['rules', 'fly', 'swim']);
const nouns = new Set(['birds', 'fish', 'C++']);
const articles = new Set(['the', 'a']);
const prepositions = new Set(['and', 'or', 'but']);

export class Token_stream {
  private full = false;
  private buffer = Token.createEmpty();
  private istream: IOstream;

  constructor(istream: IOstream) {
    this.istream = istream;
  }

  putback(t: Token) {
    if (this.full) {
      throw new Error('try putback in full buffer');
    }
    this.full = true;
    this.buffer = t;
  }

  hasNest() {
    const t = this.get();
    if (t.isEmpty()) {
      return false;
    }
    this.putback(t);
    return true;
  }

  get() {
    if (this.full) {
      this.full = false;
      return this.buffer;
    }
    const char = this.istream.char();
    if (char === '.') {
      return Token.createEnd();
    }
    if (char === '') {
      return Token.createEmpty();
    }

    this.istream.putback(char);
    const word = this.istream.word();
    if (verbs.has(word)) {
      return Token.createVerb(word);
    }
    if (articles.has(word)) {
      return Token.createArticle();
    }
    if (nouns.has(word)) {
      return Token.createNoun(word);
    }
    if (prepositions.has(word)) {
      return Token.createPreposition(word);
    }
    throw new Error('Bad token');
  }
}
