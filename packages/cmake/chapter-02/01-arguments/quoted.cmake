cmake_minimum_required(VERSION 3.20.0)

message("1. escape sequence: \" \n a quoted argument")
message("2. multi....
        line")
message("3. and a varible referrenve: ${CMAKE_VERSION}")
message(a\ single\ argument)
message(two arguments)
message(tree;separated;arguments)
message(${CMAKE_VERSION})
message(() () ())