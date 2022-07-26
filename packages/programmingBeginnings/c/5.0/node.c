#include <stdio.h>
#include <stdlib.h>


struct node {
  int val;
  struct node *left, *rigth;
};
void print_tree(struct node *r)
{
  if (!r)
    return;
  print_tree(r->left);
  printf("%d", r->val);
  print_tree(r->rigth);
}

int main() {

  return 1;
}
