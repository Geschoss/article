#include <stdio.h>
#include <stdlib.h>
#include <math.h>

enum colors
{
  red,
  orange,
  yellow,
  green,
  blue,
  violet
};

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

enum greek
{
  alpha,
  beta,
  gamma = beta,
  delta
};
void greek_print(enum greek x)
{
  switch (x)
  {
  case alpha:
    printf("Alpha\n");
    break;
  case beta:
    printf("Beta\n");
    break;
  default:;
  }
}

int string_length(const char *str)
{
  const char *p;
  p = str;
  while (*p)
    p++;
  return p - str;
}

void string_copy(char *dest, const char *src)
{
  while (*src)
  {
    *dest = *src;
    dest++;
    src++;
  }
  *dest = 0;
}

void string_copy2(char *dest, const char *src)
{
  for (; *src; dest++, src++)
  {
    *dest = *src;
  }
  *dest = 0;
}

int main()
{
  int i;
  for (i = 1; i <= 25; i++)
  {
    printf("%d x %d\t = %d\n", i, i, i * i);
  }

  int x, y;
  int *p, *q, *r;

  x = 25;
  y = 36;
  p = &x;
  q = &y;
  r = p;
  *r = *q;

  printf("x = %d, y = %d\n", x, y);

  double *k;
  k = malloc(360 * sizeof(double));
  for (i = 0; i < 360; i++)
  {
    k[i] = sin((2 * M_PI / 360.0) * (double)i);
  }
  printf("k[2] = %f \n", k[2]);
  free(k);

  const int iteration_count = 78;

  int m[] = {2,
             4,
             5,
             7,
             11,
             13,
             17,
             19,
             21,
             23};
  for (i = 0; i < sizeof(m) / sizeof(*m); i++)
  {
    printf("[%d] = %d\n", i, m[i]);
  }

  printf("%d\n", string_length("sdfsdf"));

  char str[6] = "Hello";
  char *ptr = "Hello";

  str[4] = 0;
  ptr[4] = 0;

  return 0;
}
