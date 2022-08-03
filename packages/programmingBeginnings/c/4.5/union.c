#include <stdio.h>
#include <stdlib.h>

#define HELP_TEXT \
  "This is a very good program that display file size\n" \
  "To use it you should specify the file name\n" \
  "as a command line parameter, such as\n" \
  "  fsize file.txt\n"

#define MAKE_ARRAY_SUM_FUNCTION(FUNNAME, TYPE) \
  TYPE FUNNAME(const TYPE *a, int n) \
  {\
    TYPE s = 0; \
    while(n > 0) { \
      s += *a; \
      a++; \
      n--; \
    }\
    return s; \
  }

#ifndef USE_INDEX_IN_STRING_COPY
#define USE_INDEX_IN_STRING_COPY 1
#endif

#if USE_INDEX_IN_STRING_COPY
  void string_copy(char *dest, const char *src)
  {
    int i;
    for (i = 0; src[i]; i++)
      dest[i] = src[i];
    dest[i] = 0;
  }
#else
  void string_copy(char *dest, const char *src)
  {
    for(; *src; dest++, src++)
      *dest = *src;
    *dest = 0;
  }
#endif

#if !defined(FOR_PETROV) && !defined(FOR_SIDOROV)
#error Please define either FOR_PETROV or FOR_SIDOROV
#endif

#ifndef BUFFER_SIZE
#error Please specify the buffer size
#endif

int main() {
  fputs(HELP_TEXT, stderr);
  return 0;
}