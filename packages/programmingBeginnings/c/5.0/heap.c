#include <stdio.h>
#include <stdlib.h>

int *stack_var()
{
  int stackVar = 10;
  return &stackVar;
};

int *heap_var()
{
  int *heapVar = malloc(sizeof(int));
  *heapVar = 99243;
  return heapVar;
}


int main() {
  int *heapVar = NULL, *stackVar = NULL;

  stackVar = stack_var();
  heapVar = heap_var();

  printf("stackVar = %p\n", stackVar);
  printf("*stackVar = %d\n", *stackVar); 
  
  printf("heapVar = %p\n", heapVar);
  printf("*heapVar = %d\n", *heapVar);
  return 0;
}


