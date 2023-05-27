cmake_minimum_required(VERSION 3.20.0)

# message(FATAL_ERROR "Hello")
# message(SEND_ERROR "Hello")
# message(WARNING "hello")
# message(DEPRECATION "hello")
# message(STATUS "hello")
# message(VERBOSE "hello")
# message(DEBUG "hello")
# message(TRACE "hello")

function(my_fn)
  message(TRACE "hello")
  message("pavel")
endfunction()

my_fn()