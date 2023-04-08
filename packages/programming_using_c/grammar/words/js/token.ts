export class Token {
  private kind: string;
  private value: string;

  static createEmpty() {
    return new Token('', '');
  }
  static createNoun(v: string) {
    return new Token('n', v);
  }
  static createVerb(v: string) {
    return new Token('v', v);
  }
  static createPreposition(v: string) {
    return new Token('p', v);
  }
  static createEnd() {
    return new Token('.');
  }
  static createArticle() {
    return new Token('a', '');
  }

  private constructor(k: string, v: string = '') {
    this.kind = k;
    this.value = v;
  }

  equal(ch: string) {
    return this.kind === ch;
  }
  get() {
    return this.value;
  }
  isNoun() {
    return this.kind === 'n';
  }
  isVerb() {
    return this.kind === 'v';
  }
  isPreposition() {
    return this.kind === 'p';
  }
  isEnd() {
    return this.kind === '.';
  }
  isEmpty() {
    return this.kind === '';
  }
  isArticle() {
    return this.kind === 'a';
  }
  toString() {
    return `{k: ${this.kind}, v: ${this.value}}`;
  }
}
