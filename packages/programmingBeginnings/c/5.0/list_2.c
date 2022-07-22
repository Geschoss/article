#include <stdio.h>
#include <stdlib.h>

struct item
{
  int data;
  struct item *next;
};

struct item *createList(const int *arr, int len)
{
  if (len == 0)
  {
    return NULL;
  }
  struct item *tmp = malloc(sizeof(struct item));
  tmp->data = *arr;
  tmp->next = createList(arr + 1, len - 1);
  return tmp;
}

void removeNegative(struct item *lst)
{
  struct item **pcur = &lst;
  while (*pcur)
  {
    if ((*pcur)->data < 0)
    {
      struct item *tmp = *pcur;
      *pcur = (*pcur)->next;
      free(tmp);
    }
    pcur = &(*pcur)->next;
  }
}

void deleteList(struct item *lst)
{
  if (lst)
  {
    deleteList(lst->next);
    free(lst);
  }
}

void showList(struct item *lst)
{
  struct item *tmp = lst;
  printf("-----List-----\n");
  while (tmp)
  {
    printf("lst.data = %d\n", tmp->data);
    tmp = tmp->next;
  }
}
int main()
{
  int arr[6] = {1, 2, -3, 4, 5, 6};
  struct item *lst = createList(arr, 4);

  showList(lst);
  removeNegative(lst);
  showList(lst);
  deleteList(lst);

  return 0;
}