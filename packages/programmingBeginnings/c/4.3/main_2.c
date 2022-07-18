#include <stdio.h>

void showArg_2(int argc, char **argv)
{
  argv++;
  while (*argv)
  {
    printf("[%s]\n", *argv);
    argv++;
  }
}

void showArg_1(int argc, char **argv)
{
  int i;
  for (i = 0; i < argc; i++)
  {
    printf("[%s]\n", argv[i]);
  }
}

int main(int argc, char **argv)
{
  showArg_1(argc, argv);
  showArg_2(argc, argv);

  return 0;
}
