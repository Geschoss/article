import { IOstream } from '../../common/istream';
import { Token_stream } from './token_stream';

/*
Sentence:
  "The" Noun Verb
  Sentence Preposition Sentence

Prepositions:
  "and" | "or" | "but"
  
Nouns:
  "birds" | "fish" | "C++"

Verbs:
  "rules" | "fly" | "swim"
*/

parcer('the birds fly .'); /* ? */
parcer('a birds swim or the fish rules.'); /* ? */

function parcer(str: string) {
  const iostream = new IOstream(str);
  const ts = new Token_stream(iostream);
  let result = false;
  while (ts.hasNest()) {
    let t = ts.get();
    if (t.isEnd()) {
      return result;
    } else {
      ts.putback(t);
    }
    result = sentence(ts);
  }
  return false;
}

function sentence(ts: Token_stream) {
  let left = noun(ts);
  let t = ts.get();
  if (t.isVerb()) {
    let next_t = ts.get();
    if (next_t.isPreposition()) {
      return left && sentence(ts);
    }
    ts.putback(next_t);
    return left;
  }
  return false;
}

function noun(ts: Token_stream) {
  let t = ts.get();
  if (t.isArticle()) {
    t = ts.get();
    if (t.isNoun()) {
      return true;
    }
  }
  return false;
}
