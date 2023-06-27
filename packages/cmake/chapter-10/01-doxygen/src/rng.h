#pragma once

class RandomNumberGenerator {
public:
  virtual int get() = 0;
  virtual ~RandomNumberGenerator() = default;
};
