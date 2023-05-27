cmake_minimum_required(VERSION 3.20.0)

macro(macro_fn my_var)
  set(my_var "new value")
  message("argument: ${my_var}")
endmacro()

set(my_var "first value")
message("my_var is now: ${my_var}")
macro_fn("called value")
message("my_var is now: ${my_var}")

