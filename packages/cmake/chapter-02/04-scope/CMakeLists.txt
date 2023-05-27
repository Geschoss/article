cmake_minimum_required(VERSION 3.20.0)

function(Inner)
  message("  > Inner: ${V}")
  # set(V 3)
  set(V 3 PARENT_SCOPE)
  message("  < Inner: ${V}")
endfunction()


function(Outer)
  message(" > Outer: ${V}")
  set(V 2)
  Inner()
  message(" < Outer: ${V}")
endfunction()

set(V 1)
message("> Global: ${V}")
Outer()
message("< GLobal: ${V}")