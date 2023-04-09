#include "include/std_lib_facilities.h"

class Token
{
private:

public:
  string value;
  char kind;
  Token(char ch, string v) : kind(ch), value(v) {}

  static Token createNoun(string word);
  static Token createVerb(string word);
  static Token createEnd();
  static Token createExit();
  static Token createEmpty();
  static Token createArticle(string word);
  static Token createPreposition(string word);

  bool isEnd();
  bool isExit();
  bool isNoun();
  bool isVerb();
  bool isArticle();
  bool isPreposition();
  string get_value();
};

bool Token::isPreposition()
{
  return kind == 'p';
}
bool Token::isVerb()
{
  return kind == 'v';
}
bool Token::isNoun()
{
  return kind == 'n';
}
bool Token::isArticle()
{
  return kind == 'a';
}
bool Token::isExit()
{
  return kind == 'q';
}
bool Token::isEnd()
{
  return kind == '.';
}

Token Token::createEnd()
{
  return Token{'.', ""};
}
Token Token::createNoun(string word)
{
  return Token{'n', word};
}
Token Token::createExit()
{
  return Token{'q', ""};
}
Token Token::createVerb(string word)
{
  return Token{'v', word};
}
Token Token::createArticle(string word)
{
  return Token{'a', word};
}
Token Token::createPreposition(string word)
{
  return Token{'p', word};
}
Token Token::createEmpty()
{
  return Token{'0', ""};
}
string Token::get_value()
{
  return value;
}