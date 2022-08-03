#include <stdio.h>
#include <stdlib.h>

void show_stack_address() {
  int a;
  printf("&a = %p\n", &a);
  
  if (1) {
    int b;
    printf("&b = %p\n", &b);
  }
  int c;
  printf("&c = %p\n", &c);

  if(1) {
    int d;
    printf("&d = %p\n", &d);
  }

  int i;
  printf("&i = %p\n", & i);
};

int main() {
  show_stack_address();
  return 0;
}


