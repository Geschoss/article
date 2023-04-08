export class Token {
  private kind: string;
  private value: number;

  static create(k: string, v: number = 0) {
    return new Token(k, v);
  }

  private constructor(k: string, v: number = 0) {
    this.kind = k;
    this.value = v;
  }

  equal(ch: string) {
    return this.kind === ch;
  }

  get() {
    return this.value;
  }
  toString() {
    return `{k: ${this.kind}, v: ${this.value}}`;
  }
}
