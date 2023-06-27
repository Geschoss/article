#pragma once
#include "rng.h"

/**
  This class foes some simple calculations
*/
class Calc {
  RandomNumberGenerator *rng_;

public:
  Calc(RandomNumberGenerator *rng);
  /**
  sum two integers
  @result a + b
  */
  int sum(int a, int b);
  /**
  mult.. who would have thought?
  @param a the first factor
  @param b the second factor
  @result The product
  */
  int mult(int a, int b);
  /**
  Adds randomly generated number to the parameter
  */
  int addRandomNumber(int a);
};
