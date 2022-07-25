#include <stdio.h>
#include <stdlib.h>

struct item
{
  int data;
  struct item *next;
};

struct item *add(struct item *list, int data)
{
  if (!list)
  {
    list = malloc(sizeof(struct item));
    list->data = data;
    list->next = NULL;

    return list;
  }
  else
  {
    struct item *lst = list;
    struct item *tmp = malloc(sizeof(struct item));
    tmp->data = data;
    tmp->next = NULL;

    while (lst)
    {
      if (!(lst->next))
      {
        break;
      }
      lst = lst->next;
    }
    lst->next = tmp;

    return list;
  }
};

void remove_by_idx(struct item *lst, int idx)
{
  struct item **pcur = &lst;
  while (1)
  {
    if (idx == 0)
    {
      struct item *tmp = *pcur;
      *pcur = (*pcur)->next;
      free(tmp);
      break;
    }
    pcur = &(*pcur)->next;
    idx = idx - 1;
  }
}

void show(struct item *lst)
{
  struct item *tmp = lst;
  int count = 0;
  printf("----List----\n");
  while (tmp)
  {
    printf("list[%d]=%d\n", count, tmp->data);
    count = count + 1;
    tmp = tmp->next;
  }
}

int main()
{
  struct item *lst = NULL;

  lst = add(lst, 1);
  lst = add(lst, 2);
  lst = add(lst, -3);
  lst = add(lst, 4);
  lst = add(lst, 5);
  show(lst);

  remove_by_idx(lst, 2);
  show(lst);

  return 0;
}