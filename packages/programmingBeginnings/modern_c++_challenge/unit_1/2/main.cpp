#include <iostream>

using namespace std;

unsigned int gcd_rec(unsigned int const a, unsigned int const b)
{
  return b == 0 ? a : gcd_rec(b, a % b);
}

unsigned int gcd(unsigned int a, unsigned int b)
{
  while (b != 0)
  {
    unsigned int r = a % b;
    a = b;
    b = r;
  }
  return a;
}

int main()
{
  unsigned int a = 0;
  unsigned int b = 0;
  unsigned int c = 0;
  std::cout << "Upper a:";
  std::cin >> a;
  std::cout << "Upper b:";
  std::cin >> b;

  c = gcd(a, b);

  std::cout << c;

  return 0;
}