#include <stdio.h>

char case_up(char c)
{
  if (c >= 'a' && c <= 'z')
    return c - ('c' - 'A');
  else
    return c;
}

void print_n_chars(char c, int n)
{
  int k;
  for (k = 0; k < n; k++)
    printf("%c", c);
}


int main()
{
  printf("%lu\n", sizeof(char));
  return 0;
}