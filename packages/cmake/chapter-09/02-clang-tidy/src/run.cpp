#include <iostream>
#include "calc.h"

using namespace std;

int main() {
  auto c = new Calc();
  cout << "2 + 2 = " << c->sum(2, 2) << endl;
  cout << "2 * 2 = " << c->sum(2, 2) << endl;
  return 0;
}
