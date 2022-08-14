#include <stdio.h>
#include <stdarg.h>

int sum(int c, ...)
{
  va_list vl;
  int s = c;
  int k;
  va_start(vl, c);
  while (1)
  {
    k = va_arg(vl, int);
    if (k == 0)
    {
      break;
    }
    s += k;
  }
  va_end(vl);

  return s;
}

void print_times(const char *str, ...)
{
  va_list vl;
  const char *p;

  va_start(vl, str);
  for (p = str; p; p = va_arg(vl, const char *))
  {
    int n, i;
    n = va_arg(vl, int);
    for (i = 0; i < n; i++)
      printf("%s ", p);
    printf("\n");
  }
  va_end(vl);
}

int main()
{
  printf("lesson 4.10.4\n");
  printf("sum(1, 2, 3) = %d\n", sum(1, 2, 3, 0));
  print_times("once", 1, "twice", 2, "seven times", 7, NULL);
  return 0;
}