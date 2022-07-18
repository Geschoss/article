#include <stdio.h>
#include <string.h>
#include <stdlib.h>

enum
{
  max_name_len = 64,
  max_group_len = 8
};
enum sex
{
  m = 'm',
  f = 'f'
};

struct myflags
{
  unsigned io_error : 1;
  unsigned seen_a_digit : 1;
  unsigned had_a_eol : 1;
  unsigned signaled : 1;
  unsigned count : 4;
};

struct student
{
  float average;
  int yer_of_birth;
  int major_code;
  int year;
  char group[max_group_len];
  char name[max_name_len];
  char sex;
};

int main()
{
  struct student st1;
  strcpy(st1.name, "Kolomnikov Pavel");
  st1.sex = 'm';
  st1.yer_of_birth = 1995;
  st1.major_code = 51311;
  st1.year = 3;
  strcpy(st1.group, "312");
  st1.average = 4.792;

  struct student *ptr;
  unsigned long size = sizeof(*ptr);
  ptr = malloc(size);

  printf("%lu\n", size);
  free(ptr);

  struct student *p;
  p = malloc(sizeof(*p));

  strcpy(st1.name, "Kolomnikov Pavel");
  (*p).sex = 'm';
  (*p).yer_of_birth = 1995;
  (*p).major_code = 51311;
  (*p).year = 3;
  strcpy(st1.group, "312");
  p->average = 4.792;

  printf("%d\n", p->year);
  free(p);
  return 0;
}