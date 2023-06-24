#pragma once
#include <gmock/gmock.h>

class RandomNemberGeneratorMock
    : public RandomNumberGenerator
{
public:
    MOCK_METHOD(int, Get, (), (override));
};