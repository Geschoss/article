import { IOstream } from './istream';
import { LoggerFactory } from './logger';
import { factorial } from './math';
import { Token_stream } from './token_stream';

/*
Expression:
  Term
  Expression "+" Trem
  Expression "-" Term
Term:
  Term "*" Primary
  Term "/" Primary
Primary:
  Number
  "(" Expression ")"
Number:
  Double
*/
const loggerFactory = new LoggerFactory();
const comLog = loggerFactory.create('Common');
const ioLog = loggerFactory.create('IOstream');
const tsLog = loggerFactory.create('Token_stream');
ioLog.off();
tsLog.off();
comLog.off();

function parce(exp: string) {
  try {
    const iostream = new IOstream(ioLog, exp);
    const ts = new Token_stream(tsLog, iostream);
    let result = 0;
    while (ts.hasNest()) {
      const t = ts.get();
      if (t.equal(';')) {
        return {
          status: 'success',
          result,
        };
      } else {
        ts.putback(t);
      }
      result = expression(ts);
    }
    return {
      status: 'error',
      error: new Error('Bad expression!!!'),
    };
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
}

function expression(ts: Token_stream) {
  let left = term(ts);
  let t = ts.get();
  while (true) {
    if (t.equal('+')) {
      left += term(ts);
      t = ts.get();
      continue;
    }
    if (t.equal('-')) {
      left -= term(ts);
      t = ts.get();
      continue;
    }
    ts.putback(t);
    return left;
  }
}
function term(ts: Token_stream) {
  let left = primary(ts);
  let t = ts.get();
  while (true) {
    if (t.equal('*')) {
      left *= primary(ts);
      t = ts.get();
      continue;
    }
    if (t.equal('/')) {
      let d = primary(ts);
      if (d === 0) {
        throw new Error('division by zero!!!');
      }
      left /= d;
      t = ts.get();
      continue;
    }
    ts.putback(t);
    return left;
  }
}
function primary(ts: Token_stream) {
  let t = ts.get();
  comLog.log(`primary | t ${t}`);
  if (t.equal('(')) {
    let d = expression(ts);
    t = ts.get();
    if (!t.equal(')')) {
      throw new Error("you forgon ')'");
    }
    return d;
  }
  if (t.equal('8')) {
    let next_t = ts.get();
    if (next_t.equal('!')) {
      return factorial(t.get());
    }
    ts.putback(next_t);
    return t.get();
  }
  throw new Error('need primary expression!!!');
}

parce('2+3*4!;'); /* ? */
// parce('(1+(2+3)*3);'); /* ? */
// parce('10+(2+2)*2;'); /* ? */
// parce('(10+(2+2)*4)/2;'); /* ? */
