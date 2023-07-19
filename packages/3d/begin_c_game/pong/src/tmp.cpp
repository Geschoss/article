#include <iostream>
#include <string>

class Tmp
{
public:
  std::string name;
  Tmp(std::string n);
  ~Tmp();
};

Tmp::Tmp(std::string n) {
  name = n;
  std::cout << "constructor: " << name << std::endl;
};
Tmp::~Tmp() {
  std::cout << "destructor: " << name << std::endl;
}

void say(Tmp &t)
{
  t.name = "pual";
  std::cout << "Say: " << t.name << std::endl;
}

int main() {
  Tmp tmp("Pavel");
  say(tmp);
  std::cout << "after: " << tmp.name << std::endl;
  return 0;
}