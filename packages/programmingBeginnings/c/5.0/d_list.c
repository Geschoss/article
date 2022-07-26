#include <stdio.h>
#include <stdlib.h>

struct dbl_item
{
  double data;
  struct dbl_item *prev, *next;
};
struct dbl_list {
  struct dbl_item *first;
  struct dbl_item *last;
};

void push(struct dbl_list *list, double x)
{
  struct dbl_item *tmp = malloc(sizeof(struct dbl_item));
  tmp->data = x;
  tmp->next = NULL;

  if (list->last) {
    list->last->next = tmp;
    tmp->prev = list->last;
    list->last = tmp;
  } else {
    list->first = tmp;
    list->last = tmp;
  }
}
double pop(struct dbl_list *list) {
  if (list->first) {
    struct dbl_item *tmp = list->first;
    double data = tmp->data;
    list->first = list->first->next;
    if (list->first)
    {
      list->first->prev = NULL;
    } else {
      list->last = NULL;
    }
    free(tmp);
    return data;
  }
  return -1;
}

double shift(struct dbl_list *list)
{
  if (list->last) {
    struct dbl_item *tmp = list->last;
    double data = tmp->data;
    list->last = list->last->prev;
    if (list->last) {
      list->last->next = NULL;
    } else {
      list->first = NULL;
    }
    free(tmp);
    return data;
  }
  return -1;
}

void unshift(struct dbl_list *list, double x)
{
  struct dbl_item *tmp = malloc(sizeof(struct dbl_item));
  tmp->data = x;
  tmp->prev = NULL;
  if (list->first)
  {
    list->first->prev = tmp;
    tmp->next = list->first;
    list->first = tmp;
  } else {
    list->first = tmp;
    list->last = tmp;
  }
}

void show(struct dbl_list *list)
{
  printf("show\n");
  struct dbl_item *tmp = list->first;
  while(tmp) {
    printf("item=%f\n", tmp->data);
    tmp = tmp->next;
  }
}
void show_back(struct dbl_list *list)
{
  printf("show_back\n");
  struct dbl_item *tmp = list->last;
  while(tmp) {
    printf("item=%f\n", tmp->data);
    tmp = tmp->prev;
  }
}

int main()
{
  printf("двусвязные списки\n");
  struct dbl_list *list = malloc(sizeof(struct dbl_list));

  push(list, 4.5);
  push(list, 40.2);
  push(list, 412312.2);
  push(list, 43552.2);
  unshift(list, 999.2);
  
  show(list);

  double i = pop(list);
  printf("pop %f\n", i);
  double j = shift(list);
  printf("shift %f\n", j);

  show(list);
  return 0;
}