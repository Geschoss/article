#include <stdio.h>
#include <stdlib.h>

struct node
{
  int val;
  struct node *left, *right;
};

void print_bintree(struct node *r)
{
  if (!r)
    return;
  print_bintree(r->left);
  printf("%d\n", r->val);
  print_bintree(r->right);
}

void bin_tree_map(struct node *r,
                  void (*callback)(int, void *),
                  void *userdata)
{
  if (!r)
    return;
  bin_tree_map(r->left, callback, userdata);
  (*callback)(r->val, userdata);
  bin_tree_map(r->right, callback, userdata);
}

void add_bintree(struct node **root, int n)
{
  if (!*root)
  {
    *root = malloc(sizeof(**root));
    (*root)->val = n;
    (*root)->left = NULL;
    (*root)->right = NULL;
    return;
  }
  if ((*root)->val == n)
    return;
  if ((*root)->val > n)
    add_bintree(&(*root)->left, n);
  else
    add_bintree(&(*root)->right, n);
}

void print_cb(int val, void *userdata)
{
  printf("%d\n", val);
}

void sum_cb(int data, void *userdata)
{
  //*(int*)userdata +=data;
  int *sum = userdata;
  *sum += data;
}

struct minmaxcount
{
  int count, min, max;
};

void minmaxcount_cb(int data, void *userdata)
{
  struct minmaxcount *mmc = userdata;
  if (mmc->count == 0)
  {
    mmc->min = mmc->max = data;
  }
  else
  {
    if (mmc->min > data)
      mmc->min = data;
    if (mmc->max < data)
      mmc->max = data;
  }
  mmc->count++;
}

int main()
{
  printf("bintree\n");

  struct node *btree = NULL;

  add_bintree(&btree, 5);
  add_bintree(&btree, 13);
  add_bintree(&btree, 45);
  add_bintree(&btree, 245);

  bin_tree_map(btree, &print_cb, NULL);

  int sum;
  sum = 0;
  bin_tree_map(btree, &sum_cb, &sum);

  printf("sum=%d\n", sum);

  struct minmaxcount mmc;
  mmc.count = 0;
  bin_tree_map(btree, &minmaxcount_cb, &mmc);

  printf("count=%d\nmin=%d\nmax=%d\n", mmc.count, mmc.min, mmc.max);
  return 0;
}