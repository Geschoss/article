#include <iostream>
#include "api/api.h"

int main()
{
  std::cout << "Hello World!" << std::endl;
  std::cout << fetch(5) << std::endl;
  return 0;
}