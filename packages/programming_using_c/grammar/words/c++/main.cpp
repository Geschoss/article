#include "include/std_lib_facilities.h"
#include "token_stream.cpp"

bool sentence(Token_stream &ts);
bool noun(Token_stream &ts);

int main()
{
  Token_stream ts;
  try
  {
    bool result = false;
    while (cin)
    {
      Token t = ts.get();
      if (t.isExit())
        break;
      if (t.isEnd())
      {
        if (result)
        {
          cout << "> Right sentence\n";
        }
        else
        {
          cout << "> Bad sentence\n";
        }
      }
      else
      {
        ts.putback(t);
      }
      result = sentence(ts);
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
    keep_window_open("2");
    return 2;
  }
  return 0;
}

bool sentence(Token_stream &ts)
{
  bool left = noun(ts);
  Token t = ts.get();
  if (t.isVerb())
  {
    t = ts.get();
    if (t.isPreposition())
    {
      return left && sentence(ts);
    }
    ts.putback(t);
    return left;
  }
  return false;
}

bool noun(Token_stream &ts)
{
  Token t = ts.get();
  if (t.isArticle())
  {
    t = ts.get();
    if (t.isNoun())
    {
      return true;
    }
  }
  return false;
}