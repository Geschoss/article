#include "calc.h"
#include <cstdlib>

void SumAddsTwoIntegers()
{
    Calc sut;
    if (4 != sut.sum(2, 2))
    {
        std::exit(1);
    }
}

void MultiplyMultipliesTwoInteger()
{
    Calc sut;
    if (3 != sut.mult(1, 3))
    {
        std::exit(1);
    }
}