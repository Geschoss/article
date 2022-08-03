#include <stdio.h>
#include <stdlib.h>

struct node {
  int val;
  struct node *left, *right;
};

void print_bintree(struct node *r) {
  if(!r)
    return;
  print_bintree(r->left);
  printf("%d\n", r->val);
  print_bintree(r->right);
}

void add_bintree(struct node **root, int n)
{
  if (!*root) {
    *root = malloc(sizeof(**root));
    (*root)->val = n;
    (*root)->left = NULL;
    (*root)->right = NULL;
    return;
  }
  if((*root)->val == n)
    return;
  if((*root)->val > n)
    add_bintree(&(*root)->left, n);
  else
    add_bintree(&(*root)->right, n);
}


int main() {
  printf("bintree\n");

  struct node *btree = NULL;
  
  add_bintree(&btree, 5);
  add_bintree(&btree, 13);
  add_bintree(&btree, 45);

  print_bintree(btree);

  return 0;
}