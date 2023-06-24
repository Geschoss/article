#include <catch2/catch_test_macros.hpp>
#include "calc.h"

TEST_CASE("SumAddsTwoInts", "[calc]")
{
    Calc sut;
    CHECK(4 == sut.sum(2, 2));
}

TEST_CASE("MultiplyMultipliesTwoInts", "[calc]")
{
    Calc sut;
    CHECK(12 == sut.mult(3, 4));
}