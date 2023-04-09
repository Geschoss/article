#include "include/std_lib_facilities.h"
#include <set>
#include "token.cpp"

std::set<std::string> verbs = {"rules", "fly", "swim"};
std::set<std::string> nouns = {"birds", "fish", "C++"};
std::set<std::string> articles = {"the", "a"};
std::set<std::string> prepositions = {"and", "or", "but"};

class Token_stream
{
public:
  Token get();
  void putback(Token t);

private:
  bool full{false};
  Token buffer = Token::createEmpty();
};

Token Token_stream::get() // read a token from cin
{
  if (full)
  {
    full = false;
    return buffer;
  }
  string word;
  cin >> word; // note that >> skips whitespace (space, newline, tab, etc.)

  if (word == "q")
  {
    return Token::createExit();
  }
  if (word == ".")
  {
    return Token::createEnd();
  }

  char last_char = word.at(word.length() - 1);
  if (last_char == '.')
  {
    cin.putback(last_char);
    word.pop_back();
  }
  if (verbs.contains(word))
  {
    return Token::createVerb(word);
  }
  if (nouns.contains(word))
  {
    return Token::createNoun(word);
  }
  if (articles.contains(word))
  {
    return Token::createArticle(word);
  }
  if (prepositions.contains(word))
  {
    return Token::createPreposition(word);
  }

  error("Bad token");
}

void Token_stream::putback(Token t)
{
  if (full)
  {
    error("putback() into a full buffer");
  }
  buffer = t;
  full = true;
}
