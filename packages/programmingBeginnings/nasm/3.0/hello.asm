%include "stud_io_nasm.inc"
global _start


section .text
_start: mov eax, 0
again:  PRINT "Hello"
        PUTCHAR 10
        inc eax
        cmp eax, 3
        jl again
        FINISH