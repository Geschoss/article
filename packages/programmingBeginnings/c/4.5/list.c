#include <stdio.h>
#include <stdlib.h>

struct item
{
  int data;
  struct item *next;
};

struct item *create_list(const int *arr, int len)
{
  struct item *first = NULL, *last = NULL, *tmp;
  int i;
  for (i = 0; i < len; i++)
  {
    tmp = malloc(sizeof(struct item));
    tmp->data = arr[i];
    tmp->next = NULL;
    if (last)
    {
      last->next = tmp;
      last = tmp;
    }
    else
    {
      first = tmp;
      last = tmp;
    }
  }

  return first;
}

struct item *create_list_2(const int *arr, int len)
{
  struct item *first = NULL, *tmp;
  int i;
  for (i = len - 1; i >= 0; i--)
  {
    tmp = malloc(sizeof(struct item));
    tmp->data = arr[i];
    tmp->next = first;
    first = tmp;
  }
  return first;
}

struct item *create_list_rec(const int *arr, int len)
{
  if (!len)
    return NULL;
  struct item *tmp;
  tmp = malloc(sizeof(struct item));
  tmp->data = *arr;
  tmp->next = create_list_rec(arr + 1, len - 1);
  return tmp;
}

void delete_int_list(struct item *lst)
{
  while (lst)
  {
    struct item *tmp = lst;
    lst = lst->next;
    free(tmp);
  }
}
void delete_int_list_2(struct item *lst)
{
  while (lst)
  {
    struct item *tmp = lst->next;
    free(lst);
    lst = tmp;
  }
}
void delete_int_list_rec(struct item *lst)
{
  if (!lst)
    return;
  delete_int_list_rec(lst->next);
  free(lst);
}
void delete_int_list_rec_2(struct item *lst)
{
  if (lst)
  {
    delete_int_list_rec_2(lst->next);
    free(lst);
  }
}

void remove_negative(const struct item *lst)
{
  struct item **pcur;
  pcur = &lst;
  while (*pcur)
  {
    if ((*pcur)->data < 0)
    {
      struct item *tmp = *pcur;
      *pcur = (*pcur)->next;
      free(tmp);
    }
    else
    {
      pcur = &(*pcur)->next;
    }
  }
}


// sum
int int_list_sum(const struct item *lst)
{
  int sum = 0;
  const struct item *tmp = lst;
  while (tmp)
  {
    sum = sum + tmp->data;
    tmp = tmp->next;
  }
  return sum;
}

int sum_list(const struct item *lst)
{
  int sum = 0;
  const struct item *tmp;
  for (tmp = lst; tmp; tmp = tmp->next)
    sum = sum + tmp->data;
  return sum;
}
int sum_list_short(const struct item *lst)
{
  int sum = 0;
  for (; lst; lst = lst->next)
    sum = sum + lst->data;
  return sum;
}
int sum_list_rec(const struct item *lst)
{
  if (lst)
    return lst->data + sum_list_rec(lst->next);
  else
    return 0;
}
int sum_list_one(const struct item *lst)
{
  return lst ? lst->data + sum_list_one(lst->next) : 0;
}

int main()
{
  const int size = 5;
  int arr[size] = {5, 4, 3, 2, 1};
  struct item *list;

  printf("arr[2] = %d\n", arr[2]);

  list = create_list(arr, size);

  while (list)
  {
    printf("list.data = %d\n", list->data);
    list = list->next;
  }
  delete_int_list_2(list);

  struct item *list_2;
  list_2 = create_list_2(arr, 5);

  while (list_2)
  {
    printf("list.data = %d\n", list_2->data);
    list_2 = list_2->next;
  }
  delete_int_list(list_2);

  struct item *list_3;
  list_3 = create_list_rec(arr, 5);

  while (list_3)
  {
    printf("list.data = %d\n", list_3->data);
    list_3 = list_3->next;
  }

  struct item *list_sum;
  list_sum = create_list_rec(arr, 5);
  printf("sum = %d\n", int_list_sum(list_sum));
  printf("sum = %d\n", sum_list(list_sum));
  printf("sum = %d\n", sum_list_short(list_sum));
  printf("sum = %d\n", sum_list_rec(list_sum));
  printf("sum = %d\n", sum_list_one(list_sum));

  int remove_arr[size] = {5, -2, 3, -4, 1};
  struct item *remove_list;

  printf("remove_arr[2] = %d\n", remove_arr[1]);

  remove_list = create_list_2(remove_arr, size);
  remove_negative(remove_list);

  while (remove_list)
  {
    printf("remove_list.data = %d\n", remove_list->data);
    remove_list = remove_list->next;
  }

  return 0;
}