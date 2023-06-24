#pragma once
#include "rng.h"

class Calc
{
    RandomNumberGenerator* rng_;

public:
    Calc (RandomNumberGenerator* rng_);
    int sum(int a, int b);
    int mult(int a, int b);
    int addRandomNumber(int a);
};