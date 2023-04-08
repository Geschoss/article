#include "include/std_lib_facilities.h"

double factorial(double n)
{
  if (n == 1)
  {
    return 1;
  }
  return n * factorial(n - 1);
};

class Token
{
public:
  char kind;
  double value;
  Token(char ch) : kind(ch), value(0) {}
  Token(char ch, double v) : kind(ch), value(v) {}

  bool equal(char ch);
};

class Token_stream
{
public:
  Token get();
  void putback(Token t);

private:
  bool full{false};
  Token buffer = {'0'};
};

class Name_value
{
public:
  string name;
  double value;
};

double expression(Token_stream &ts);
double term(Token_stream &ts);
double primary(Token_stream &ts);

int main()
{
  Token_stream ts;
  try
  {
    double val = 0;
    while (cin)
    {
      Token t = ts.get();
      if (t.equal('q'))
        break;
      if (t.equal(';'))
      {
        cout << "=" << val << '\n';
      }
      else
      {
        ts.putback(t);
      }
      val = expression(ts);
    }
    keep_window_open("0");
  }
  catch (exception &e)
  {
    cerr << e.what() << '\n';
    keep_window_open("1");
    return 1;
  }
  catch (...)
  {
    cerr << "Exception!!!\n";
    keep_window_open("~2");
    return 2;
  }

  return 0;
}

double expression(Token_stream &ts)
{
  double left = term(ts);
  Token t = ts.get();
  while (true)
  {
    switch (t.kind)
    {
    case '+':
      left += term(ts);
      t = ts.get();
      break;
    case '-':
      left -= term(ts);
      t = ts.get();
      break;
    default:
      ts.putback(t);
      return left;
    }
  }
}

double term(Token_stream &ts)
{
  double left = primary(ts);
  Token t = ts.get();
  while (true)
  {
    switch (t.kind)
    {
    case '*':
      left *= primary(ts);
      t = ts.get();
      break;
    case '/':
    {
      double d = primary(ts);
      if (d == 0)
      {
        error("division by zero!!!");
      }
      left /= d;
      t = ts.get();
      break;
    }
    default:
      ts.putback(t);
      return left;
    }
  }
}

double primary(Token_stream &ts)
{
  Token t = ts.get();
  switch (t.kind)
  {
  case '(':
  {
    double d = expression(ts);
    t = ts.get();
    if (t.kind != ')')
    {
      error("you forgot ')'");
    }
    return d;
  }
  case '{':
  {
    double d = expression(ts);
    t = ts.get();
    if (t.kind != '}')
    {
      error("you forgot '}'");
    }
    return d;
  }
  case '8':
  {
    Token t1 = ts.get();
    if (t1.equal('!'))
    {
      return factorial(t.value);
    }
    else
    {
      ts.putback(t1);
      return t.value;
    }
  }
  default:
    error("need primary expression!!!");
  }
}

Token Token_stream::get() // read a token from cin
{
  if (full)
  {
    full = false;
    return buffer;
  }
  char ch;
  cin >> ch; // note that >> skips whitespace (space, newline, tab, etc.)

  switch (ch)
  {
  case 'q':
  case ';':
  case '(':
  case ')':
  case '}':
  case '{':
  case '+':
  case '-':
  case '*':
  case '/':
  case '!':
    return Token{ch}; // let each character represent itself
  case '.':
  case '0':
  case '1':
  case '2':
  case '3':
  case '4':
  case '5':
  case '6':
  case '7':
  case '8':
  case '9':
  {
    cin.putback(ch); // put digit back into the input stream
    double val;
    cin >> val;             // read a floating-point number
    return Token{'8', val}; // let '8' represent "a number"
  }
  default:
    error("Bad token");
  }
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

bool Token::equal(char ch)
{
  return kind == ch;
}