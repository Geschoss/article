#include <stdio.h>

const int size_x = 3;
const int size_y = 3;
typedef int matrix4x4[size_y][size_x];

void show(matrix4x4 m)
{
  int i, j;
  for (i = 0; i < size_y; i++)
    for (j = 0; j < size_x; j++)
      printf("m[%d][%d]=%d\n", i, j, m[i][j]);
}
void init(matrix4x4 m)
{
  int i, j;
  for (i = 0; i < size_y; i++)
    for (j = 0; j < size_x; j++)
      m[i][j] = (1 + i) * (j + 3);
}

void map(matrix4x4 m, int (*cb)(int value, int i, int j))
{
  int i, j;
  for (i = 0; i < size_y; i++)
    for (j = 0; j < size_x; j++)
      m[i][j] = cb(m[i][j], i, j);
}

int add2(int v, int i, int j)
{
  return v + 2;
}

int f(int x, int y)
{
  return x + y;
}

int (*funret(int x))(int, int)
{
  printf("%d", x);
  return &f;
}

int main()
{
  printf("lesson 4.9\n");
  matrix4x4 m;

  init(m);
  show(m);
  printf("after map\n");
  map(m, &add2);
  show(m);

  return 0;
}