#include <stdio.h>
#include <stdlib.h>

int length(char str[])
{
  int i = 0;
  while (str[i] != '\0')
  {
    i = i + 1;
  }
  return i;
}

char *split(char str[])
{
  int i;
  int j = 0;
  int len = length(str);
  char *spl_str;
  spl_str = (char *)(malloc(len * 2));
  for (i = 0; str[i] != '\0'; i++)
  {
    spl_str[j] = str[i];
    j = j + 1;
    spl_str[j] = ' ';
    j = j + 1;
  }
  return (char *)spl_str;
}
char *reverse(char str[])
{
  int i = 0;
  int len = length(str);
  char *rev_str;
  rev_str = (char *)(malloc(len));
  while (len > -1)
  {
    rev_str[i] = str[len - 1];
    len--;
    i++;
  }
  return (char *)rev_str;
}

int count_space(char str[]) {
  int c = 0;
  int i;
  for (i = 0; str[i] != '\0';i++){
    if (str[i]==' ' || str[i]=='\n' || str[i]=='\t') {
      c++;
    }
  }
  return c;
}

int equal_str(char *str1, char *str2)
{
  
  return 1;
}

int main()
{
  char str[100] = "This is w3resource.com";
  printf("length(str) = %d\n", length(str));
  printf("split(str) = %s\n", split(str));
  printf("reverse(str) = %s\n", reverse(str));
  printf("count_space(str) = %d\n", count_space(str));
  return 0;
}