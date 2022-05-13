%include "stud_io.inc"

global    _start

          section   .text
_start:   mov       ebx, 1

again:    mov       eax, 1            ; system call for write
          mov       edi, 1            ; file handle 1 is stdout
          mov       esi, message      ; address of string to output
          mov       edx, 13           ; number of bytes
          syscall                     ; invoke operating system to do the write

          inc ebx
          cmp ebx, 10
          jl again

          FINISH

          section   .data
message:  db        "Hello, World", 10      ; note the newline at the end