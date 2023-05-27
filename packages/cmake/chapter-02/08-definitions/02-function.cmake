cmake_minimum_required(VERSION 3.20.0)

function(fn_my first_arg)
  message("Function: ${CMAKE_CURRENT_FUNCTION}")
  message("File: ${CMAKE_CURRENT_FUNCTION_LIST_FILE}")
  message("FirstArg: ${first_arg}")
  set(first_arg "new value")
  message("FirstArg again: ${first_arg}")
  message("ARGV0: ${ARGV0} ARGV1: ${ARGV1} ARGC: ${ARGC}")
endfunction()

set(first_arg "first_arg")
fn_my("Value1" "Value2")
message("first_arg in global scope: ${first_arg}")
