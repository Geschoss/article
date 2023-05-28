#include <iostream>
// special macro to convert definitions into c-strings:
#define str(s) #s
#define xstr(s) str(s)

int main()
{
#if defined(SHA)
  std::cout << "GIT commint: " << xstr(SHA) << std::endl;
#endif
}
