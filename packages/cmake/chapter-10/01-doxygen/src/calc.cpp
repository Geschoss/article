#include "calc.h"

Calc::Calc(RandomNumberGenerator *rng) { rng_ = rng; }

int Calc::sum(int a, int b) { return a + b; }

int Calc::mult(int a, int b) { return a * b; }

int Calc::addRandomNumber(int a) { return a + rng_->get(); }
