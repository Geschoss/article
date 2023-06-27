#include "calc.h"
#include "rng_mt19937.h"
#include <iostream>

using namespace std;

int run() {
  auto rng = new RandomNumberGeneratorMt19937();
  Calc c(rng);
  cout << "Random dice throw + 1 = " << c.addRandomNumber(1) << endl;
  delete rng;
  return 0;
}
